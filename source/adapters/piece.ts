export const DEFAULT_RANGE=[
        0,
        1,
        10,
        50,
        100,
        500,
        1000,
]

export const DEFAULT_COLOR=[
      '#EEFFEE',
      '#FFFADD',
      '#FFDC90',
      '#FF9040',
      '#DD5C5C',
      '#901010',
      '#600000',
      '#1f77b4',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd22',
      '#17becf',
]

export const create_pieces=(
    range=DEFAULT_RANGE,
    color=DEFAULT_COLOR,
)=>{

    let l=range.length
    let l1=color.length

    if (l>l1) throw 'need more color!'
    if (l<2) throw "???"

    let o=[]
    for (let i=0;i<l;i++){

        let n=range[i]
        let next=range[i+1]
        let c=color[i]
        let d={}

        if (i==0){
            d= { min: 0, max: 0, color:c }
        }else if(i==1){
            d={ min: n, lte: next, color:c }
        }else if (i == l-1){
            d={ gt: n, color:c}
        }else{
            d={ gt: n, lte: next, color:c}
        }
        o.push(d)
    }
    return o
}


const test=()=>{
    let r=[
      { min: 0, max: 0, color: '#EEFFEE' },
      { min: 1, lte: 10, color: '#FFFADD' },
      { gt: 10, lte: 50, color: '#FFDC90' },
      { gt: 50, lte: 100, color: '#FF9040' },
      { gt: 100, lte: 500, color: '#DD5C5C' },
      { gt: 500, lte: 1000, color: '#901010' },
      { gt: 1000, color: '#600000' }
    ]
    let r1=create_pieces()
    console.log(r1)

    let range=[0,1,100,1000,2000,3000]
    let r2=create_pieces(range)
    console.log(r2)
    let r3=[
      { min: 0, max: 0, color: '#EEFFEE' },
      { min: 1, lte: 100, color: '#FFFADD' },
      { gt: 100, lte: 1000, color: '#FFDC90' },
      { gt: 1000, lte: 2000, color: '#FF9040' },
      { gt: 2000, lte: 3000, color: '#DD5C5C' },
      { gt: 3000, color: '#901010' }
    ]
}

export default create_pieces
