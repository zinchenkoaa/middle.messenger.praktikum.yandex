import {Block} from "../utils/block";
import Router from "./Router";
import { stub } from 'sinon';

import {expect} from "chai";

class Test extends Block {
    protected render() {
        return '<div>Test</div>';
    }
}

 describe('Router', () => {
   const pushStateStub = stub(window.history, 'pushState');
   const historyBackStub = stub(history, 'back');
   const historyForwardStub = stub(history, 'forward');
   const router = new Router('#app')

   before(() => {
     router
     .use('/', Test)
     .use('/test1', Test)
     .use('/test2', Test)
     .start();
   });

     after(() => {
         // Восстановление оригинальных методов
         pushStateStub.restore();
         historyBackStub.restore();
         historyForwardStub.restore();
     });

     beforeEach(() => {
         // Сброс вызовов заглушек перед каждым тестом
         pushStateStub.resetHistory();
         historyBackStub.resetHistory();
         historyForwardStub.resetHistory();
     });

     it('should ensure Router is a singleton', () => {
         const router1 = new Router('#app');
         const router2 = new Router('#app');
         expect(router1).to.equal(router2);
     });

     it('should register routes correctly', () => {
         expect(router.getRoute('/')).to.not.be.undefined;
         expect(router.getRoute('/test1')).to.not.be.undefined;
         expect(router.getRoute('/test2')).to.not.be.undefined;
     });

     it('should call pushState when navigating with go', () => {
         router.go('/test1');
         expect(pushStateStub.calledOnce).to.be.true;
         expect(pushStateStub.calledWith({}, '', '/test1')).to.be.true;

         router.go('/test2');
         expect(pushStateStub.callCount).to.equal(2);
         expect(pushStateStub.calledWith({}, '', '/test2')).to.be.true;
     });

     it('should handle unknown route with 404', () => {
         const spyRender = stub(Test.prototype, 'render' as keyof Test);
         router.use('/404', Test);

         router.go('/non-existent');
         expect(spyRender.calledOnce).to.be.true;

         spyRender.restore();
     });

     it('should go forward on history', () => {
         router.forward();
         expect(historyForwardStub.calledOnce).to.be.true;
     });

     it('should go back on history', () => {
         router.back();
         expect(historyBackStub.calledOnce).to.be.true;
     });

     it('should number of go equal history length', () => {
         router.go('/test1');
         router.go('/test2');
         expect(pushStateStub.callCount).to.equal(2);
     });
 });
