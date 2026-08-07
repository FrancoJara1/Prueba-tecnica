export async function getMe(c: any) {

  const user = c.get("user");


  return c.json({
    id: user.id,
    name: user.name,
    email: user.email
  });

}