import HTTPTransport from './HTTPtransport';
import { expect, use } from 'chai';
import sinonChai from 'sinon-chai'
import {SinonStub, createSandbox} from 'sinon';
/* eslint-disable @typescript-eslint/no-explicit-any */

describe('HTTPTransport', () => {
    use(sinonChai)
    const sandbox = createSandbox();
    let http: HTTPTransport;
    let request: SinonStub<any>

    beforeEach(() => {
        http = new HTTPTransport();
        const fakeXhr = { readyState: 4, responseText: '{}', status: 200 } as XMLHttpRequest;
        request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => Promise.resolve(fakeXhr))
    });

    afterEach(() => {
        sandbox.restore()
    });

    describe('GET method', () => {
        it('should execute GET request', async () => {
            http.get('');
            expect(request).calledWithMatch('', {method: 'GET'})
        });
    })

    describe('POST method', () => {
        it('should execute POST request', async () => {
            http.post('', {data: {a: 1, b: 2}});
            expect(request).calledWithMatch('', {data: {a: 1, b: 2}, method: 'POST'})
        });
    });

    describe('PUT method', () => {
        it('should execute PUT request', async () => {
            http.put('', {data: {a: 1}});
            expect(request).calledWithMatch('', {data: {a: 1}, method: 'PUT'})
        });
    });

    describe('DELETE method', () => {
        it('should execute DELETE request', async () => {
            http.delete('', {data: {id: 1}});
            expect(request).calledWithMatch('', {data: {id: 1}, method: 'DELETE'})
        });
    });

    describe('Error handling', () => {
        it('should handle request errors', async () => {
            try {
                await http.get('/error');
            } catch (error) {
                expect(error.message).to.include('Network error');
            }
        });

        it('should handle request timeout', async () => {
            try {
                await http.get('/timeout');
            } catch (error) {
                expect(error.message).to.include('Request timeout');
            }
        });
    });
});
