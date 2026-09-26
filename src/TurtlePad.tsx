import React from 'react';
import {Text,TextInput,View} from 'react-native';
import {Polyline,Circle,Line,Text as Label,G} from 'react-native-svg';
import {runTurtle} from './turtle';
import DiagramFrame from './DiagramFrame';
const ink='#203E36';
const fmt=(n:number)=>Number(n.toFixed(2)).toString();
export default function TurtlePad({value,onChange}:{value:string;onChange:(v:string)=>void}){
 const result=runTurtle(value),xs=result.points.map(p=>p.x),ys=result.points.map(p=>p.y);
 const span=Math.max(Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys),4);
 const unit=Math.max(1,Math.ceil(span/8));
 const minX=Math.floor(Math.min(...xs)/unit)*unit-unit,maxX=Math.ceil(Math.max(...xs)/unit)*unit+unit;
 const minY=Math.floor(Math.min(...ys)/unit)*unit-unit,maxY=Math.ceil(Math.max(...ys)/unit)*unit+unit;
 const scale=Math.min(200/(maxX-minX),180/(maxY-minY));
 const px=(x:number)=>50+(x-minX)*scale,py=(y:number)=>25+(y-minY)*scale;
 const end=result.points[result.points.length-1],closed=Math.hypot(end.x,end.y)<1e-8;
 const description=`The drawing starts at (0, 0), facing north. Each grid interval is ${unit} ${unit===1?'unit':'units'}. The filled dot marks Start; the outlined ring marks End${closed?', at the same position as Start':''}. Final position (${fmt(end.x)}, ${fmt(-end.y)}), with positive coordinates right and up. Final heading ${fmt(result.heading)} degrees clockwise from north. The ordered command trace below the diagram describes every turn and segment.`;
 return <View style={{gap:12,padding:18,backgroundColor:'#EDF3E6',borderRadius:16}}>
  <Text accessibilityRole="header" style={{fontSize:18,fontWeight:'700',color:ink}}>My drawing program</Text>
  <Text style={{fontSize:16,lineHeight:25,color:ink}}>Start facing up (north). Write FORWARD 3, RIGHT 90 or LEFT 90 on separate lines. Your path updates as you type. Distances are in units and turns in degrees. The scale adjusts to fit your drawing; use the labelled grid and command trace to compare lengths.</Text>
  <TextInput accessibilityLabel="Drawing program" multiline value={value} onChangeText={onChange} maxLength={1000} autoCorrect={false} autoCapitalize="characters" style={{minHeight:150,padding:14,backgroundColor:'white',borderWidth:1,borderColor:'#82988A',borderRadius:12,fontFamily:'monospace',fontSize:16,textAlignVertical:'top',color:ink}}/>
  <Text accessibilityLiveRegion="polite" style={{color:ink,fontSize:16,lineHeight:25}}>{result.error||`Program drawn. ${result.points.length-1} forward moves.`}</Text>
  <DiagramFrame title="My drawing and its scale" description={description} canvasHeight={260}>
   {Array.from({length:Math.round((maxX-minX)/unit)+1},(_,i)=>{const x=minX+i*unit;return <G key={`x${i}`}><Line x1={px(x)} y1={py(minY)} x2={px(x)} y2={py(maxY)} stroke="#62796B" strokeWidth={1}/><Label x={px(x)} y={py(maxY)+20} fontSize={14} textAnchor="middle" fill={ink}>{fmt(x)}</Label></G>})}
   {Array.from({length:Math.round((maxY-minY)/unit)+1},(_,i)=>{const y=minY+i*unit;return <G key={`y${i}`}><Line x1={px(minX)} y1={py(y)} x2={px(maxX)} y2={py(y)} stroke="#62796B" strokeWidth={1}/><Label x={px(minX)-6} y={py(y)+5} fontSize={14} textAnchor="end" fill={ink}>{fmt(-y)}</Label></G>})}
   <Polyline points={result.points.map(p=>`${px(p.x)},${py(p.y)}`).join(' ')} stroke="#203E36" strokeWidth={3} fill="none"/>
   <Circle cx={px(0)} cy={py(0)} r={4} fill="#843C0C"/>
   <Circle cx={px(end.x)} cy={py(end.y)} r={8} fill="none" stroke="#203E36" strokeWidth={2}/>
   <Label x={px(0)} y={py(0)-12} fontSize={14} textAnchor="middle" fill={ink}>{closed?'Start / End':'Start'}</Label>
   {!closed&&<Label x={px(end.x)} y={py(end.y)-12} fontSize={14} textAnchor="middle" fill={ink}>End</Label>}
  </DiagramFrame>
  <Text accessibilityRole="header" style={{fontSize:18,fontWeight:'700',color:ink}}>Command trace</Text>
  <Text style={{fontSize:16,lineHeight:25,color:ink}}>Coordinates are (right, up). A minus sign means left or down. Heading is measured clockwise from north: 0° north, 90° east, 180° south, 270° west.</Text>
  {!result.trace.length&&<Text style={{fontSize:16,color:ink}}>No valid commands yet. Start: (0, 0), heading 0° north.</Text>}
  {result.trace.map((step,i)=><Text key={i} selectable style={{fontSize:16,lineHeight:25,color:ink}}>{`${i+1}. ${step.command} ${fmt(step.amount)}. ${step.command==='FORWARD'?`Length ${fmt(step.amount)} units. From (${fmt(step.from.x)}, ${fmt(-step.from.y)}) to (${fmt(step.to.x)}, ${fmt(-step.to.y)}).`:`Turn ${step.command==='RIGHT'?'clockwise':'anticlockwise'} ${fmt(step.amount)}°. Position stays (${fmt(step.to.x)}, ${fmt(-step.to.y)}).`} Heading now ${fmt(step.heading)}° clockwise from north.`}</Text>)}
 </View>;
}
