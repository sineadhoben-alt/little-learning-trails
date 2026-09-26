export type Point={x:number;y:number};
export type TurtleStep={command:'FORWARD'|'RIGHT'|'LEFT';amount:number;from:Point;to:Point;heading:number};
export type TurtleResult={points:Point[];trace:TurtleStep[];heading:number;error?:string};
// A deliberately small drawing language, never JavaScript evaluation.
// Points retain screen coordinates (positive y down); headings are clockwise
// degrees from north. The accessible trace converts y to positive-up coordinates.
export function runTurtle(source:string):TurtleResult{
 const points:Point[]=[{x:0,y:0}],trace:TurtleStep[]=[];let direction=-90;
 const heading=()=>((direction+90)%360+360)%360;
 const result=(error?:string):TurtleResult=>({points,trace,heading:heading(),...(error?{error}:{})});
 const lines=source.trim().split(/\n|;/).map(v=>v.trim()).filter(Boolean);
 if(lines.length>40)return result('Use at most 40 commands.');
 for(const [index,line] of lines.entries()){
  const match=/^(FORWARD|RIGHT|LEFT)\s+(\d+(?:\.\d+)?)$/i.exec(line);
  if(!match)return result(`Command ${index+1}: use FORWARD 3, RIGHT 90 or LEFT 90.`);
  const amount=Number(match[2]),command=match[1].toUpperCase() as TurtleStep['command'];
  if(amount>360)return result(`Command ${index+1}: use numbers from 0 to 360.`);
  const from={...points[points.length-1]};
  if(command==='RIGHT')direction+=amount;
  else if(command==='LEFT')direction-=amount;
  else{
   if(amount>20)return result('Use forward distances up to 20 squares.');
   const clean=(n:number)=>Math.abs(n)<1e-9?0:n;
   points.push({x:clean(from.x+amount*Math.cos(direction*Math.PI/180)),y:clean(from.y+amount*Math.sin(direction*Math.PI/180))});
  }
  trace.push({command,amount,from,to:{...points[points.length-1]},heading:heading()});
 }
 return result();
}
