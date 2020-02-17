const cors = (req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Reuested-With, Content-Type, Accept, Authorization'
    );
  
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', 'POST, GET');
      return res.status(200).json({});
    }
    next();
  };
  
export default cors;