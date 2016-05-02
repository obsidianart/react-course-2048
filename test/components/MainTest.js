/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict'

// Uncomment the following lines to use the react test utilities
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import createComponent from 'helpers/shallowRenderHelper'

import Main from 'components/Main'

describe('MainComponent', () => {
  let MainComponent

  beforeEach(() => {
    //MainComponent = createComponent(Main) => to test real dom
    MainComponent = TestUtils.renderIntoDocument(<Main />)
  })

  //Testing business logic for now
  it.skip('should move tiles to the right', () => {
  	// Original  =>  Move Right
  	// 1 0 0 0   =>  0 0 0 1
  	// 0 0 0 0   =>  0 0 0 0
  	// 0 0 0 0   =>  0 0 0 0
  	// 0 0 0 0   =>  0 0 0 0

  	let original = [{x:0, y:0, val:2}]
  	
  	let result = MainComponent.moveTilesRight({
  		tiles: original
  	})
	
	expect(result.tiles).to.deep.equal([
     	{x:3, y:0, val:2}
    ])

  	// MainComponent.setState({
  	// 	tiles: [{x:0, y:0}]
  	// })
    //  expect(MainComponent.state.tiles).to.deep.equal([
    //  	{x:1, y:0}
    //  ])
  })
})
