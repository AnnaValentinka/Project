export default function isAdmin(req, res, next) {
  if (req.session?.user?.admin === true) return next();
  return res.sendStatus(403);
}
