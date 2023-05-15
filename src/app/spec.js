const http = require('http');

function testHttpPost(url, postData, expectedResponse, done) {
    const data = JSON.stringify(postData);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        },
    };

    const req = http.request(url, options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            try {
                const parsedData = JSON.parse(responseData);
                expect(parsedData).toEqual(expectedResponse);
                done();
            } catch (error) {
                done.fail(`Error al analizar la respuesta JSON: ${error.message}`);
            }
        });
    });

    req.on('error', (error) => {
        done.fail(`Error al realizar la solicitud HTTP: ${error.message}`);
    });

    req.write(data);
    req.end();
}

describe('Prueba de integración de Login', () => {
    it('debe retornar un 200 OK', (done) => {
        const url = 'http://127.0.0.1:9000/api/auth/authenticate';
        const postData = { email: 'estefanibearroyo@gmail.com', password: 'Cumbres114' };
        const expectedResponse = {
            token: jasmine.any(String),
            newToken: jasmine.any(String)
        };

        testHttpPost(url, postData, expectedResponse, done);
    });
});

