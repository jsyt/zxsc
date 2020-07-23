console.log('uk-form-help-block');
//# sourceMappingURL=index.js.map

function co (it) {
  return new Promise((resolve, reject) => {
    function next (data) {
      let {value, done} = it.next(data);
      if (!done) {
        Promise.resolve(value).then(next, reject);
      } else {
        resolve(value);
      }
    }
    next();
  })
}

middlewares.reduce((a, b) => (...args) => a(b(...args)))