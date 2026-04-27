-- Fix mutable search_path on set_updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Restrict EXECUTE on the SECURITY DEFINER signup handler
revoke execute on function public.handle_new_user() from public, anon, authenticated;