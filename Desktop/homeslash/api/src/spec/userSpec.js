const request = require("supertest");


describe("Register User by rest API", () => {

    it("Register success", (done) => {
        request("http://localhost:3000")
            .post("/register")
            .send("nom=John&prenom=User&email=doe@do.doe&password=zoubida")
            .set("Accept", "application/json")
            .expect(201, {
                error: false,
                message: "Super ton compte à été créé !"
            }, done);
    });

    it("Register fail", (done) => {
        request("http://localhost:3000")
            .post("/register")
            .send("nom=John&prenom=User&email=doe@do.doe&password=zoubida")
            .set("Accept", "application/json")
            .expect(400, { error: true, message: "Un compte est déjà enregistré à cet email" }, done);
    });

    it("Register fail2", (done) => {
        request("http://localhost:3000")
            .post("/register")
            .send("nom=John&prenom=User&email=doe@do.doe&password=zoubida")
            .set("Accept", "application/json")
            .expect(400, { error: true, message: "La requête d'inscription en base de donnée n'a pas fonctionné" }, done);
    });
});