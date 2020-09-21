import mock from "fetch-mock";
import employeesData from "../employeesData.json";
import skillsData from "../skillsData.json";

let employees = employeesData;
let skills = skillsData;

export default () => {
  mock.get(/employees$/, () => employees, {delay: 500});

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
  }, {delay: 500});

  mock.get(/skills\/categories$/, () => ["Devops", "Logistics", "Programming skills"], {delay: 500});

  mock.get(/skills\/(.*)$/, (url) => {
    const [, id] = url.match(/skills\/?(.*)$/) || []
    const skill = skills.find(i => i._id === id);
    return skill ? skill : {status: 404};
  }, {delay: 500});

  mock.get(/skills*/, () => {
    return {
      skills: skills,
      totalRecords: 6,
      currentPage: 1,
    }
  }, {delay: 500});

  mock.post(/skills$/, (url, options) => {
    const skill = JSON.parse(options.body as string);
    skills.push(skill)
    return {status: 200, body: skills}
  }, {delay: 500})

  mock.put(/skills\/(.*)$/, (url, options) => {
    const [, id] = url.match(/skills\/?(.*)$/) || [];
    const skill = JSON.parse(options.body as string);
    skills = skills.map(i => id.includes(i._id) ? skill : i );
    return skill;
  }, {delay: 500});

  mock.delete(/skills\/(.*)$/, (url) => {
    const [, id] = url.match(/skills\/?(.*)$/) || []
    skills = skills.filter(e => !id.includes(e._id));
    return {status: 201}
  }, {delay: 500})
}
