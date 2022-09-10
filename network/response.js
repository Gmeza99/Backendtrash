const response = {
  success: (req, res, status, message, data) => {
    res.status(status || 200).json({
      message,
      data,
    });
  },

  //Para igualar el response anterior y no afectar al front


  //Responder en Json
  success_json: (req, res, status, data) => {
    res.status(status || 200).json({
      data,
    });
  },

  //Responder sin la variable data
  success_plain: (req, res, status, message) => {
    res.status(status || 200).send(message);
  },

  error: (req, res, status, message, error) => {
    console.log(error)
    res.status(status || 500).json({
      error: message,
    });
  },
};

module.exports  = response