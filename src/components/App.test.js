import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import {findByTestAttr, storeFactory} from '../../test/testUtils'


 const setup = (state={}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />);
  return wrapper;
}
  
  test('renders without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'navigation');
    expect(appComponent.length).toBe(1);
  });