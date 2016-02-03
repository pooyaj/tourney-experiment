import React from 'react/addons';
import MyComponent from '../../src/components/MyComponent';
import {expect} from 'chai';


const {renderIntoDocument, scryRenderedDOMComponentsWithTag} = React.addons.TestUtils;

describe('MyComponent', () => {

  it('renders a the text', () => {
    const comp = renderIntoDocument(
      <MyComponent data="Hey" />
    );
    const component = scryRenderedDOMComponentsWithTag(comp, 'div');

    expect(component.length).to.equal(1);
    expect(component[0].textContent).to.equal('Hey');
  });

});
