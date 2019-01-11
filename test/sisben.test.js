const chai = require("chai");
const server = require("../server");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

describe("SISBEN CONTROLLER", () => {
  const body = {
    identification: "45485519",
    type: 1
  };

  const url = `/sisben?identification=${body.identification}&type=${body.type}`;

  it("SISBEN WEB SCRAPPING [TEST]", done => {
    chai
      .request(server)
      .get(url)
      .end((err, res) => {
        if (err) done(err);
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body).to.property("nombreCompleto");
        done();
      });
  });
});
