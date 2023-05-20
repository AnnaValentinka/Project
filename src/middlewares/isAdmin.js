export default function isAdmin(req, res, next) {
  try {
    if (req.session?.user?.admin === true) {
      return next();
    }
    return res.sendStatus(403);
  } catch (error) {
    console.log('Ошибка при проверке прав администратора:', error);
    return res.sendStatus(500);
  }
}
