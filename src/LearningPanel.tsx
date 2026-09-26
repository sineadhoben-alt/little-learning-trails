import React,{useState} from 'react';
import {Text,View,Pressable} from 'react-native';
import {learning,accessGuidance} from './learning';
import type {Level} from './content';
export function AdultRubric({id,level}:{id:string;level:Level}){
 const step=learning[id]?.steps[level];if(!step)return null;
 return <View style={{gap:12}}><Text style={body}>Review focus: {step.focus}</Text><Text style={body}>Needs support: {step.rubric.support}</Text><Text style={body}>Developing: {step.rubric.developing}</Text><Text style={body}>Secure on this task: {step.rubric.secure}</Text><Text style={body}>{accessGuidance}</Text><Text style={body}>If the task could not be accessed or observed, leave it unreviewed. These draft criteria await qualified teacher validation.</Text></View>;
}
export default function LearningPanel({id,level,onExample}:{id:string;level:Level;onExample:()=>void}){
 const [open,setOpen]=useState(false);const lesson=learning[id],step=lesson?.steps[level];if(!step)return null;
 return <View style={{padding:18,gap:12,backgroundColor:'#EDF3E6',borderRadius:16}}><Text accessibilityRole="header" style={{...body,fontSize:20,fontWeight:'700'}}>Learn this step</Text><Text style={body}>{step.focus}</Text><Text style={body}>Useful starting ideas: {lesson.prerequisites.join('; ')}.</Text><Pressable accessibilityRole="button" accessibilityState={{expanded:open}} onPress={()=>{setOpen(!open);if(!open)onExample();}} style={{padding:14,minHeight:48,borderWidth:1,borderColor:'#244E40',borderRadius:12}}><Text style={{...body,fontWeight:'700'}}>{open?'Hide worked example':'Show a worked example'}</Text></Pressable>{open&&<><Text style={body}>{step.example.prompt}</Text><Text style={body}>Think it through: {step.example.reasoning}</Text><Text style={body}>Example response: {step.example.answer}</Text><Text style={body}>Now try your mission. Using this example is useful practice; it will be recorded as supported work.</Text></>}</View>;
}
const body={fontSize:16,lineHeight:25,color:'#203E36'};
