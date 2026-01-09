const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Extrair o token do cabeçalho Authorization
  const { authorization } = req.headers;

  // 2. Verificar se o cabeçalho existe e começa com 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autorização necessário' });
  }

  // 3. Extrair apenas o token (remover 'Bearer ')
  const token = authorization.replace('Bearer ', '');

  console.log("🔑 Token recebido:", token);

  let payload;

  try {
    // 4. Verificar se o token é válido
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // 5. Se o token for inválido, retornar erro 401
    return res.status(401).json({ message: 'Token inválido' });
  }

  // 6. Adicionar o payload ao req.user
  req.user = payload;

  // 7. Continuar para o próximo middleware/rota
  next();
};