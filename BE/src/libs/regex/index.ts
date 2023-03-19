export const regexs = {
  onlyNumber: new RegExp(/^[0-9]*$/),
  postcode: new RegExp(/^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i),

  //   password
  strongPassword: new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
  ),
  mediumPassword: new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))',
  ),
};
