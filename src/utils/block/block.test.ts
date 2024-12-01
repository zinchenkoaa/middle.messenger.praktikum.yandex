import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { SinonSpy, spy, stub } from 'sinon';
import {Block} from "./block";

class BlockStub extends Block {
    constructor(props?: {[x: string]: unknown }) {
        super({ ...props });
    }
    render() {
        return '<div>Test</div>';
    }
}

describe('Block', () => {
    let block: Block;
    let renderStub: SinonSpy;
    use(sinonChai)

    beforeEach(() => {
        block = new BlockStub({ prop1: 'initialValue' });
        renderStub = spy(BlockStub.prototype, 'render');
    });

    afterEach(() => {
        renderStub.restore();
    });

    it('should return outerHTML', () => {
        expect(block.element!.outerHTML).to.equal('<div>Test</div>');
    });

    it('should update props on Block', () => {
        block.setProps({ prop1: 'updatedValue' });
        expect(block.getProps()).to.deep.equal({
            prop1: 'updatedValue',
        });
    });

    it('should call event handler when event is triggered', () => {
        const testEventHandler = stub();
        const testEvent = new MouseEvent('click');
        block.setProps({
            events: {
                click: testEventHandler,
            },
        });
        block.element?.dispatchEvent(testEvent);
        expect(testEventHandler.calledOnce).to.be.true;
    });

    it('should set attributes on the Block element', () => {
        block.setProps({ attr: { class: 'test-class', id: 'test-id' } });
        expect(block.element?.getAttribute('class')).to.equal('test-class');
        expect(block.element?.getAttribute('id')).to.equal('test-id');
    });

    it('should trigger re-render when a proxy-tracked property is modified', () => {
        const initialProps = { prop1: 'initial' };
        block = new BlockStub(initialProps);

        block.setProps({ prop1: 'changed' });
        expect(renderStub.calledTwice).to.be.true;
    });

    it('should call render on initialization', () => {
        const initialProps = { prop1: 'initial' };
        block = new BlockStub(initialProps);
        expect(renderStub.calledOnce).to.be.true;
    });

    it('should correctly add and remove event listeners', () => {
        const eventSpy = stub();
        block.setProps({
            events: {
                click: eventSpy,
            },
        });

        block.element?.dispatchEvent(new MouseEvent('click'));
        expect(eventSpy.calledOnce).to.be.true;

        block.setProps({ events: {} }); // Remove events
        block.element?.dispatchEvent(new MouseEvent('click'));
        expect(eventSpy.calledOnce).to.be.true; // Should not increment
    });

    it('should properly handle child blocks', () => {
        const childBlock = new BlockStub();
        block = new BlockStub({ child: childBlock });

        expect(block.getContent().outerHTML).to.include('<div>Test</div>'); // Child block's HTML
    });

    it('should show and hide the block', () => {
        block.hide();
        expect(block.getContent().style.display).to.equal('none');

        block.show();
        expect(block.getContent().style.display).to.equal('block');
    });

    it('should throw an error when trying to get content of unrendered block', () => {
        const newBlock = new BlockStub();
        newBlock['_element'] = null; // Simulate missing element
        expect(() => newBlock.getContent()).to.throw('Element is not created');
    });
});
