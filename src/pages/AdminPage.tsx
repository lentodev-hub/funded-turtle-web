import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import CmsManager from "@/components/admin/CmsManager";

type Profile = { id: string; username: string | null; created_at: string };
type Purchase = {
  id: string;
  user_id: string;
  plan_name: string;
  account_size: number;
  amount_paid: number;
  currency: string;
  status: string;
  created_at: string;
};
type Payout = {
  id: string;
  user_id: string;
  purchase_id: string | null;
  amount: number;
  profit_split_pct: number;
  status: string;
  notes: string | null;
  created_at: string;
  paid_at: string | null;
};

const STATUS_OPTIONS = ["pending", "active", "passed", "failed", "funded"];

const statusVariant = (s: string): "default" | "secondary" | "destructive" | "outline" => {
  if (s === "passed" || s === "funded" || s === "active") return "default";
  if (s === "failed") return "destructive";
  return "secondary";
};

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);

  // payout form
  const [payoutUserId, setPayoutUserId] = useState("");
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutSplit, setPayoutSplit] = useState("80");
  const [payoutNotes, setPayoutNotes] = useState("");

  const loadAll = async () => {
    setLoading(true);
    const [{ data: pf }, { data: pu }, { data: po }] = await Promise.all([
      supabase.from("profiles").select("id, username, created_at").order("created_at", { ascending: false }),
      supabase.from("challenge_purchases").select("*").order("created_at", { ascending: false }),
      supabase.from("payouts").select("*").order("created_at", { ascending: false }),
    ]);
    setProfiles(pf ?? []);
    setPurchases(pu ?? []);
    setPayouts(po ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) loadAll();
  }, [isAdmin]);

  if (authLoading || roleLoading) return null;
  if (!user) return <Navigate to="/login?next=/admin" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  const usernameFor = (id: string) => profiles.find((p) => p.id === id)?.username ?? id.slice(0, 8);

  const updatePurchaseStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("challenge_purchases").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Status updated");
    setPurchases((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const createPayout = async () => {
    if (!payoutUserId || !payoutAmount) return toast.error("User and amount required");
    const { error } = await supabase.from("payouts").insert({
      user_id: payoutUserId,
      amount: Number(payoutAmount),
      profit_split_pct: Number(payoutSplit),
      notes: payoutNotes || null,
      status: "pending",
    });
    if (error) return toast.error(error.message);
    toast.success("Payout recorded");
    setPayoutAmount(""); setPayoutNotes("");
    loadAll();
  };

  const markPaid = async (id: string) => {
    const { error } = await supabase.from("payouts").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Marked as paid");
    loadAll();
  };

  return (
    <section className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-4xl">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage traders, challenges, and payouts</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Traders" value={profiles.length} />
          <StatCard label="Purchases" value={purchases.length} />
          <StatCard label="Revenue" value={`$${purchases.reduce((s, p) => s + Number(p.amount_paid), 0).toLocaleString()}`} />
          <StatCard label="Payouts" value={`$${payouts.reduce((s, p) => s + Number(p.amount), 0).toLocaleString()}`} />
        </div>

        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-4">
            <div className="rounded-xl border bg-card">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Username</TableHead><TableHead>User ID</TableHead><TableHead>Joined</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {profiles.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.username ?? "—"}</TableCell>
                      <TableCell className="font-mono text-xs">{p.id}</TableCell>
                      <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                  {!profiles.length && <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No users yet</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="purchases" className="mt-4">
            <div className="rounded-xl border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trader</TableHead><TableHead>Plan</TableHead><TableHead>Size</TableHead>
                    <TableHead>Paid</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchases.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{usernameFor(p.user_id)}</TableCell>
                      <TableCell>{p.plan_name}</TableCell>
                      <TableCell>${Number(p.account_size).toLocaleString()}</TableCell>
                      <TableCell>${Number(p.amount_paid).toLocaleString()}</TableCell>
                      <TableCell>
                        <Select value={p.status} onValueChange={(v) => updatePurchaseStatus(p.id, v)}>
                          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((s) => (
                              <SelectItem key={s} value={s}>
                                <Badge variant={statusVariant(s)} className="capitalize">{s}</Badge>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                  {!purchases.length && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">No purchases yet</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="payouts" className="mt-4 space-y-6">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold mb-4">Record a new payout</h3>
              <div className="grid md:grid-cols-5 gap-3">
                <div className="md:col-span-2">
                  <Label>Trader</Label>
                  <Select value={payoutUserId} onValueChange={setPayoutUserId}>
                    <SelectTrigger><SelectValue placeholder="Select trader" /></SelectTrigger>
                    <SelectContent>
                      {profiles.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.username ?? p.id.slice(0, 8)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Amount ($)</Label>
                  <Input type="number" value={payoutAmount} onChange={(e) => setPayoutAmount(e.target.value)} />
                </div>
                <div>
                  <Label>Split %</Label>
                  <Input type="number" value={payoutSplit} onChange={(e) => setPayoutSplit(e.target.value)} />
                </div>
                <div className="flex items-end">
                  <Button onClick={createPayout} className="w-full">Add</Button>
                </div>
                <div className="md:col-span-5">
                  <Label>Notes (optional)</Label>
                  <Input value={payoutNotes} onChange={(e) => setPayoutNotes(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trader</TableHead><TableHead>Amount</TableHead><TableHead>Split</TableHead>
                    <TableHead>Status</TableHead><TableHead>Notes</TableHead><TableHead>Date</TableHead><TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{usernameFor(p.user_id)}</TableCell>
                      <TableCell>${Number(p.amount).toLocaleString()}</TableCell>
                      <TableCell>{p.profit_split_pct}%</TableCell>
                      <TableCell><Badge variant={p.status === "paid" ? "default" : "secondary"} className="capitalize">{p.status}</Badge></TableCell>
                      <TableCell className="max-w-xs truncate">{p.notes ?? "—"}</TableCell>
                      <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {p.status !== "paid" && (
                          <Button size="sm" variant="outline" onClick={() => markPaid(p.id)}>Mark paid</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {!payouts.length && <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No payouts yet</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-4">
            <CmsManager />
          </TabsContent>
        </Tabs>

        {loading && <p className="text-center text-muted-foreground mt-6">Loading...</p>}
      </div>
    </section>
  );
};

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-xl border bg-card p-5">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="font-display font-bold text-2xl mt-1">{value}</div>
  </div>
);

export default AdminPage;
