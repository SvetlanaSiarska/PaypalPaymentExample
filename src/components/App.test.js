import React from 'react'
import { shallow } from 'enzyme'
//import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App'
import {findByTestAttr, storeFactory} from '../../test/testUtils'

//Enzyme.configure({adapter: new EnzymeAdapter()}); 

/*
const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props} />)
    if (state) wrapper.setState(state);
    return wrapper;
  }
  */

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