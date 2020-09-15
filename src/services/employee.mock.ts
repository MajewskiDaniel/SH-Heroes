import mock from "fetch-mock";
import employeesData from "../employeesData.json";

let employees = employeesData;

export default () => {
  mock.get(/employees$/, () => employees, {delay: 2000});

  mock.get(/employees\/(.*)$/, (url) => {
    const [, id] = url.match(/employees\/?(.*)$/) || []
    const employee = employees.find(i => i._id === id);
    return employee ? employee : {status: 404};
  }, {delay: 500});

  mock.post(/employees$/, (url, options) => {
    const user = JSON.parse(options.body as string);
    employees.push(user)
    return {status: 200, body: user}
  }, {delay: 500})

  mock.put(/employees\/(.*)$/, (url, options) => {
    const [, id] = url.match(/employees\/?(.*)$/) || [];
    const user = JSON.parse(options.body as string);
    employees = employees.map(i => id.includes(i._id) ? user : i );
    return user;
  }, {delay: 500});

  mock.delete(/employees\/(.*)$/, (url) => {
    const [, id] = url.match(/employees\/?(.*)$/) || []
    employees = employees.filter(e => !id.includes(e._id));
    return {status: 201}
  }, {delay: 500})
}
