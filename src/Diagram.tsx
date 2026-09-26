import React from 'react';
import DiagramFrame from './DiagramFrame';
import Svg, {Line, Rect, Circle, Polygon, Path, Text as Label, G} from 'react-native-svg';
import type {Level} from './content';
const green='#275D4B',orange='#924610',ink='#203E36';
const L=({x,y,children,size=14}:any)=><Label x={x} y={y} fill={ink} fontSize={size} textAnchor="middle">{children}</Label>;
export default function Diagram({id,level}:{id:string;level:Level}){
 let title='',description='',drawing:React.ReactNode=null,canvasWidth=300;
 if(['negative','decimal-scaling','estimate'].includes(id)){
 title='Explore the number line';description='A number line with equally spaced marks from minus five to five. Numbers increase to the right.';
 drawing=<><Line x1={20} y1={95} x2={280} y2={95} stroke={ink} strokeWidth={2}/>{Array.from({length:11},(_,i)=><G key={i}><Line x1={25+i*25} y1={88} x2={25+i*25} y2={102} stroke={green} strokeWidth={2}/><L x={25+i*25} y={124}>{i-5}</L></G>)}<L x={150} y={55}>smaller ←             → larger</L></>;
 if(id!=='negative')return null;
 } else if(id==='time'&&level===0){
 title='Read the clock';description='An analogue clock. The long minute hand points to six. The shorter hour hand points halfway between three and four.';
 drawing=<><Circle cx={150} cy={93} r={74} fill="#FFF" stroke={green} strokeWidth={3}/>{Array.from({length:12},(_,i)=>{let a=(i+1)*Math.PI/6;return <L key={i} x={150+59*Math.sin(a)} y={98-59*Math.cos(a)}>{i+1}</L>})}<Line x1={150} y1={93} x2={150} y2={146} stroke={green} strokeWidth={4}/><Line x1={150} y1={93} x2={189} y2={103} stroke={ink} strokeWidth={6}/><Circle cx={150} cy={93} r={5} fill={orange}/></>;
 }else if(['shapes','symmetry'].includes(id)){
 title=id==='symmetry'?'A line of symmetry':'Look at sides and corners';description=id==='symmetry'?'A square with a dashed vertical line through its centre. Its left and right halves match across the line.':'A triangle, rectangle and regular pentagon shown side by side. Drawings are examples, not to scale.';
 drawing=id==='symmetry'?<><Rect x={80} y={25} width={140} height={140} fill="#DDECCB" stroke={green} strokeWidth={3}/><Line x1={150} y1={10} x2={150} y2={180} stroke={ink} strokeWidth={2} strokeDasharray="5 5"/></>:<><Polygon points="15,125 55,45 95,125" stroke={green} strokeWidth={3} fill="#DDECCB"/><Rect x={112} y={65} width={78} height={60} stroke={green} strokeWidth={3} fill="#FAE3BE"/><Polygon points="245,40 286,70 270,118 220,118 204,70" stroke={green} strokeWidth={3} fill="#E5E2F4"/><L x={55} y={154}>triangle</L><L x={151} y={154}>rectangle</L><L x={245} y={154}>pentagon</L></>;
 }else if(id==='solids'&&level===2){
 title='A net to explore';description='Six equal squares form a cube net: four squares in a horizontal row, with one square above and one below the second square. The lines between squares are fold lines. Try folding paper to check how the faces meet.';
 drawing=<>{[[0,1],[1,1],[2,1],[3,1],[1,0],[1,2]].map(([x,y],i)=><Rect key={i} x={42+x*48} y={18+y*48} width={48} height={48} fill="#DDECCB" stroke={green} strokeWidth={2}/>)}</>;
 }else if(id==='solids'&&level===0){
 title='Explore a cube';description='A cube is shown in perspective. The front face is square. Every face of a cube is a square of the same size. The top and side look slanted in this drawing because we are looking from an angle. Hidden edges are dashed.';
 drawing=<><Polygon points="70,65 165,65 165,160 70,160" fill="#DDECCB" stroke={green} strokeWidth={2}/><Polygon points="70,65 110,25 205,25 165,65" fill="#F9E5C7" stroke={green} strokeWidth={2}/><Polygon points="165,65 205,25 205,120 165,160" fill="#BED7CC" stroke={green} strokeWidth={2}/><Path d="M70 160 L110 120 L205 120 M110 120 L110 25" fill="none" stroke={green} strokeWidth={2} strokeDasharray="5 5"/></>;
 }else if(id==='volume'&&level===0){
 title='Build with unit cubes';description='Three unit cubes are arranged in one row, one cube high and one cube deep. Each small cube occupies one cubic unit. Count the cubes, not the visible faces.';
 drawing=<>{[0,1,2].map(i=><G key={i}><Rect x={38+i*60} y={70} width={60} height={60} fill="#DDECCB" stroke={green} strokeWidth={2}/><Polygon points={(38+i*60)+',70 '+(58+i*60)+',50 '+(118+i*60)+',50 '+(98+i*60)+',70'} fill="#F9E5C7" stroke={green} strokeWidth={2}/></G>)}<Polygon points="218,70 238,50 238,110 218,130" fill="#BED7CC" stroke={green} strokeWidth={2}/></>;
 }else if(['solids','volume'].includes(id)){
 title='Explore a cuboid';description=id==='volume'?(level===1?'A cuboid labelled length 4 cm, width 3 cm and height 2 cm. Hidden edges are dashed. The drawing is not to scale.':'A cuboid labelled length 5 cm, width 4 cm and unknown height. Its volume is 60 cubic centimetres. The drawing is not to scale.'):'A cuboid shown in perspective. Its front, top and right faces are visible; hidden back edges are dashed. The picture is not to scale.';
 drawing=<><Polygon points="65,70 185,70 185,150 65,150" fill="#DDECCB" stroke={green} strokeWidth={2}/><Polygon points="65,70 110,30 230,30 185,70" fill="#F9E5C7" stroke={green} strokeWidth={2}/><Polygon points="185,70 230,30 230,110 185,150" fill="#BED7CC" stroke={green} strokeWidth={2}/><Path d="M65 150 L110 110 L230 110 M110 110 L110 30" fill="none" stroke={green} strokeWidth={2} strokeDasharray="5 5"/><L x={124} y={176}>{id==='volume'?(level===1?'4 cm':'5 cm'):'length'}</L><L x={259} y={88}>{id==='volume'?(level===1?'2 cm':'? cm'):'height'}</L><L x={235} y={150}>{id==='volume'?(level===1?'3 cm':'4 cm'):'width'}</L></>;
 }else if(id==='angles'){
 title=level===0?'An acute angle':'Compare turns';description=level===0?'Two rays form a 60-degree acute angle. A curved mark shows the interior angle.':'A right angle is a quarter turn. A straight angle is a half turn. A full turn is 360 degrees.';
 drawing=level===0?<><Path d="M65 155 L240 155 M65 155 L145 16" stroke={green} strokeWidth={3}/><Path d="M108 155 A43 43 0 0 0 86.5 117.8" stroke={orange} strokeWidth={3} fill="none"/><L x={124} y={130}>60°</L></>:<><Path d="M40 110 L40 40 M40 110 L110 110 M40 92 L58 92 L58 110" fill="none" stroke={green} strokeWidth={3}/><L x={75} y={150}>90°</L><Line x1={160} y1={110} x2={280} y2={110} stroke={green} strokeWidth={3}/><Path d="M190 110 A30 30 0 0 1 250 110" fill="none" stroke={orange} strokeWidth={3}/><L x={220} y={150}>180°</L><L x={160} y={180}>A full turn = 360°</L></>;
 }else if(id==='coordinates'){
 title='Across first, then up';description='A coordinate grid from zero to six on both axes, with point (3,2) marked: three units right and two units up from the origin.';
 drawing=<>{Array.from({length:7},(_,i)=><G key={i}><Line x1={55+i*23} y1={20} x2={55+i*23} y2={158} stroke="#62796B"/><Line x1={55} y1={158-i*23} x2={193} y2={158-i*23} stroke="#62796B"/><L x={55+i*23} y={178}>{i}</L><L x={37} y={163-i*23}>{i}</L></G>)}<Line x1={55} y1={158} x2={213} y2={158} stroke={green} strokeWidth={2}/><Line x1={55} y1={158} x2={55} y2={8} stroke={green} strokeWidth={2}/><Circle cx={124} cy={112} r={5} fill={green}/><L x={161} y={103}>(3, 2)</L><L x={228} y={163}>x</L><L x={42} y={12}>y</L></>;
 }else if(id==='directions'){
 title='The eight compass points';description='Clockwise from the top: north, north-east, east, south-east, south, south-west, west, north-west.';
 drawing=<>{['N','NE','E','SE','S','SW','W','NW'].map((v,i)=>{let a=i*Math.PI/4;return <G key={v}><Line x1={150} y1={95} x2={150+53*Math.sin(a)} y2={95-53*Math.cos(a)} stroke={green} strokeWidth={i%2?1:3}/><L x={150+76*Math.sin(a)} y={100-76*Math.cos(a)}>{v}</L></G>})}<Circle cx={150} cy={95} r={6} fill={orange}/></>;
 }else if(['fraction-links','fractions'].includes(id)){
 const numerator=id==='fractions'?1:(level===0?1:3),denominator=id==='fractions'?(level===0?2:4):(level===0?2:level===1?4:5);
 const parts=[denominator,denominator*2,denominator*4];
 title='Equal parts, one whole';description='Three equal-length strips each show '+numerator+'/'+denominator+' shaded. From top to bottom they are split into '+parts.join(', ')+' equal parts. The labels describe equivalent fractions. '+((id==='fractions'&&level===2)?'One quarter is also 25%.':'');
 drawing=<>{parts.map((count,row)=><G key={count}>{Array.from({length:count},(_,i)=><Rect key={i} x={20+i*200/count} y={25+row*52} width={200/count} height={34} fill={i<count*numerator/denominator?'#477B61':'#FFF'} stroke={ink}/>) }<L x={259} y={48+row*52}>{count*numerator/denominator}/{count}</L></G>)}</>;
 }else if(id==='scale'){
 title='A map needs a scale';description='A schematic map with a tree and pond joined by a straight path. A scale bar represents two metres. Use the question’s stated lengths for calculations; this screen illustration is not a physical ruler.';
 drawing=<><Rect x={35} y={20} width={230} height={130} fill="#E3EED9" stroke={green}/><Circle cx={76} cy={65} r={22} fill="#699F67"/><Rect x={72} y={65} width={8} height={30} fill={green}/><Circle cx={222} cy={93} r={24} fill="#94C5D1"/><Line x1={104} y1={90} x2={193} y2={90} stroke={ink} strokeWidth={5}/><Line x1={40} y1={173} x2={100} y2={173} stroke={ink} strokeWidth={3}/><L x={173} y={178}>2 metres</L></>;
 }else if(id==='place-value'){
 canvasWidth=420;title='Every digit has a place';description='Place-value columns from left to right: ten-thousands, thousands, hundreds, tens, ones, tenths and hundredths. Each place is ten times the place to its right. Moving one place right divides the value by ten.';
 drawing=<>{['10000','1000','100','10','1','0.1','0.01'].map((v,i)=><G key={v}><Rect x={5+i*59} y={60} width={58} height={62} fill={i%2?'#F9E5C7':'#DDECCB'} stroke={green}/><L x={34+i*59} y={94}>{v}</L></G>)}</>;
 }else return null;
 return <DiagramFrame title={title} description={description} canvasWidth={canvasWidth}>{drawing}</DiagramFrame>
}
