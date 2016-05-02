/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict'

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils'
import createComponent from 'helpers/shallowRenderHelper'

import TileComponent from 'components//TileComponent.js'

describe('TileComponent', () => {
  let component

  describe('Basic tile', () => {
  	beforeEach(() => {
      component = createComponent(TileComponent, {
      	tile:{
	      	x:1,
	      	y:2,
	      	val:16,
	      	merged: false,
	      	new: false
      	}
	  })
    })
  
    it('should have a className based on its value', () => {
      expect(component.props.className).to.equal('tile tile-16')
    })
  })

  describe('merged tile', () => {
  	beforeEach(() => {
      component = createComponent(TileComponent, {
      	tile:{
	      	x:1,
	      	y:2,
	      	val:16,
	      	merged: true,
	      	new: false
      	}
	  })
    })

    it('should have a className based on being just merged', () => {
      expect(component.props.className).to.equal('tile tile-16 merged')
    })
  })

  describe('new tile', () => {
  	beforeEach(() => {
      component = createComponent(TileComponent, {
      	tile:{
	      	x:1,
	      	y:2,
	      	val:16,
	      	merged: false,
	      	new: true
      	}
	  })
    })

    it('should have a className based on being just merged', () => {
      expect(component.props.className).to.equal('tile tile-16 new')
    })
  })
})
