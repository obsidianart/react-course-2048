var reducer = require('../../src/reducers/game')

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


describe('main', () => {

  it('should not change the passed state', done => {
    const state = Object.freeze({})
    reducer(state, {type: 'INVALID'})
    done()
  })

  it('should move the game Right', done => {

  	var tiles = parseTransition(
  	 // Original => Move Right
  		`2 0 0 0 => 0 0 0 2
  		 0 0 0 0 => 0 0 0 0
  		 0 0 0 0 => 0 0 0 0
  		 0 0 0 0 => 0 0 0 0`
  	)

  	const state = Object.freeze({
  		tiles:tiles.start
  	})

  	
  	let newState = reducer(state, {type: 'MOVE_RIGHT'})
	
	expect(newState.tiles).to.deep.equal(tiles.end)

    done()
  })
})
