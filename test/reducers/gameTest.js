import reducer from '../../src/reducers/game'

//Parse a board (array of lines) and convert to tiles
// [["0 0 0 2"],["0 0 0 0"]] => {x:3, y:0, val:2}
let stringToTiles = (strGameArray) => {
	return strGameArray
		    .map((line, y) =>
		         line.split(' ')
		         	.map(val => parseInt(val))
		            .map((val,x)=>{
		               return {x,y,val:val}
		            })
		            .filter(tile=>tile.val!=0)
		         )
		    .reduce((ret,b)=> {
		    	 //flatten the array
		      b.forEach((el)=>ret.push(el))
		      return ret
		    },[])
}

//Parse 2 boards and return the separately
// "board A => board B"
// "0 0 2 0 => 0 0 0 2"
//return {start:[{x:2,y:0, val:2}], end:[{x:3,y:0, val:2}]}
let parseTransition = (strGame) => {
	var games = strGame
			.split(/ => |\n/)
			.map(line => line.trim())
			.reduce((ret, line, index) => {
				let isStart = index%2===0
				if (isStart) {
					ret.start.push(line)
				} else {
					ret.end.push(line)
				}
				return ret
			},{start:[],end:[]})
	
	return {
		start: stringToTiles(games.start),
		end: stringToTiles(games.end)
	}
}

//Execute a move and expect a result, as described in the game (check tests to understand)
let executedMoveAndExpect = (action, game) => {
	return new Promise((resolve, reject) => {
		//Order of result is not important, sorting all tiles by value first
		let byXYVal = (a,b) => (a.x + a.y*10 + a.val*100) - (b.x + b.y*10 + b.val*100)

	  	var tiles = parseTransition(game)

	  	const state = Object.freeze({
	  		tiles:tiles.start.sort(byXYVal)
	  	})

	  	let newTiles = reducer(state, {type: action})
                        .tiles
                        .sort(byXYVal)

      let expectedTiles = tiles.end.sort(byXYVal)

      // console.log('---------------------------------')
      // console.log('-------EVALUATED')
      // newTiles.map(tile=>console.log(tile))
      // console.log('-------EXPECTED')
      // tiles.end.map(tile=>console.log(tile))
      // console.log('---------------------------------')

      newTiles
        .forEach((tile, index)=>{
          let expectTile = expectedTiles[index]
          let currentScenario = 'Failed on Actual: ' + JSON.stringify(tile) + ' - Expected: ' + JSON.stringify(expectTile)
          expect(tile.x).to.equal(expectTile.x, currentScenario )
          expect(tile.y).to.equal(expectTile.y, currentScenario )
          expect(tile.val).to.equal(expectTile.val,currentScenario )
        })

	    resolve()
	})
}

let executedMoveRightAndExpect = game => executedMoveAndExpect('MOVE_RIGHT', game)
let executedMoveLeftAndExpect = game => executedMoveAndExpect('MOVE_LEFT', game)
let executedMoveUpAndExpect = game => executedMoveAndExpect('MOVE_UP', game)
let executedMoveDownAndExpect = game => executedMoveAndExpect('MOVE_DOWN', game)


describe('main', () => {

  it('should not change the passed state', done => {
    const state = Object.freeze({})
    reducer(state, {type: 'INVALID'})
    done()
  })

  it('should move the game right', done => {
  	executedMoveRightAndExpect(
  	 // Original => Move Right
  		`2 0 0 0 => 0 0 0 2
  		 0 0 0 0 => 0 0 2 0
  		 0 0 0 0 => 0 0 0 0
  		 0 0 0 0 => 0 0 0 0`
  	).then(done).catch(done)
  })

  it('should move the game right for every line', done => {
  	executedMoveRightAndExpect(
  	 // Original => Move Right
  		`2 0 0 0  => 0 2 0 2
  		 4 0 0 0  => 0 0 0 4
  		 8 0 0 0  => 0 0 0 8
  		 16 0 0 0 => 0 0 0 16`
  	).then(done).catch(done)
  })

  it('should merge right when possible', done => {
  	executedMoveRightAndExpect(
  	 // Original => Move Right
  		`2 2 0 0   => 0 0 0 4
  		 4 4 0 0   => 0 0 0 8
  		 8 8 0 0   => 0 0 2 16
  		 16 16 0 0 => 0 0 0 32`
  	).then(done).catch(done)
  })


  it('should not merge right when values are different', done => {
  	executedMoveRightAndExpect(
  	 // Original => Move Right
  		`2 4 0 0   => 0 0 2 4
  		 4 8 0 0   => 0 0 4 8
  		 8 16 0 0  => 0 2 8 16
  		 16 32 0 0 => 0 0 16 32`
  	).then(done).catch(done)
  })


  it('should move the game Left', done => {
  	executedMoveLeftAndExpect(
  	 // Original => Move Left
  		`2 0 0 0 => 2 0 0 0
  		 0 0 0 0 => 0 0 0 0
  		 0 0 0 0 => 0 2 0 0
  		 0 0 0 0 => 0 0 0 0`
  	).then(done).catch(done)
  })

  it('should move the game Left for every line', done => {
  	executedMoveLeftAndExpect(
  	 // Original => Move Left
  		`0 2 0 0  => 2 2 0 0
  		 0 4 0 0  => 4 0 0 0
  		 0 8 0 0  => 8 0 0 0
  		 0 16 0 0 => 16 0 0 0`
  	).then(done).catch(done)
  })

  it('should merge Left when possible', done => {
  	executedMoveLeftAndExpect(
  	 // Original => Move Left
  		`2 2 0 0   => 4 0 0 0
  		 4 4 0 0   => 8 0 0 0
  		 8 8 0 0   => 16 0 2 0
  		 16 16 0 0 => 32 0 0 0`
  	).then(done).catch(done)
  })


  it('should move the game Down', done => {
  	executedMoveDownAndExpect(
  	 // Original => Move Down
  		`2 0 0 0 => 0 0 0 0
  		 0 0 0 0 => 0 0 2 0
  		 0 0 0 0 => 0 0 0 0
  		 0 0 0 0 => 2 0 0 0`
  	).then(done).catch(done)
  })

  it('should move the game Down for every line', done => {
  	executedMoveDownAndExpect(
  	 // Original => Move Down
  		`2 4 8 8 => 0 0 0 0
  		 0 0 0 0 => 0 0 4 0
  		 0 0 0 0 => 0 0 0 0
  		 0 0 0 0 => 2 4 8 8`
  	).then(done).catch(done)
  })

  it('should merge Down when possible', done => {
  	executedMoveDownAndExpect(
  	 // Original => Move Down
  		`2 4 8 16 => 0 0 0 2
  		 2 4 8 16 => 0 0 0 0
  		 0 0 0 0  => 0 0 0 0
  		 0 0 0 0  => 4 8 16 32`
  	).then(done).catch(done)
  })


  it('should move the game Up', done => {
  	executedMoveUpAndExpect(
  	 // Original => Move Up
  		`0 0 0 0 => 2 0 0 0
  		 0 0 0 0 => 0 0 0 0
  		 2 0 0 0 => 0 2 0 0
  		 0 0 0 0 => 0 0 0 0`
  	).then(done).catch(done)
  })

  it('should move the game Up for every line', done => {
  	executedMoveUpAndExpect(
  	 // Original => Move Up
  		`0 0 0 0 => 2 4 8 8
  		 0 0 0 0 => 0 0 0 0
  		 2 4 8 8 => 0 0 2 0
  		 0 0 0 0 => 0 0 0 0`
  	).then(done).catch(done)
  })

  it('should merge Up when possible', done => {
  	executedMoveUpAndExpect(
  	 // Original => Move Up
  		`2 4 8 16 => 4 8 16 32
  		 2 4 8 16 => 0 0 0 2
  		 0 0 0 0  => 0 0 0 0
  		 0 0 0 0  => 0 0 0 0`
  	).then(done).catch(done)
  })

  it.skip('should say game over when no available moves', done => {
    //Check game.gameOver after trying to move on a finished game
  })
})
