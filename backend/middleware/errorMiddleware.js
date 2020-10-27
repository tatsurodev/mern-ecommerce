const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  // error handlerにnextの引数でerror内容を渡す
  next(error)
}

// error handlerの引数は計4つで最初の引数はerror
const errorHandler = (err, req, res, next) => {
  // errorでも200のerrorが返ってくるときがあるのでその時は500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
