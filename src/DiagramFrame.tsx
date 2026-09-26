import React, {useState} from 'react';
import {Modal, Pressable, ScrollView, Text, View, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg from 'react-native-svg';

type Props={title:string;description:string;children:React.ReactNode;canvasWidth?:number;canvasHeight?:number};
const ink='#203E36';
export default function DiagramFrame({title,description,children,canvasWidth=300,canvasHeight=190}:Props){
 const [open,setOpen]=useState(false),[zoom,setZoom]=useState(1);const {fontScale}=useWindowDimensions();
 // Expanded labels are at least 16.8 logical pixels (14 SVG units × 1.2),
 // and increase with the device's font setting instead of shrinking to fit.
 const expandedWidth=canvasWidth*1.2*Math.max(1,fontScale)*zoom;
 const action=(label:string,onPress:()=>void,disabled=false)=><Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{disabled}} disabled={disabled} onPress={onPress} style={{minHeight:48,padding:14,borderWidth:2,borderColor:ink,borderRadius:12,backgroundColor:disabled?'#E6E9E2':'white',justifyContent:'center'}}><Text style={{fontSize:16,fontWeight:'700',color:ink}}>{label}</Text></Pressable>;
 const picture=(expanded:boolean)=><View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants"><Svg width={expanded?expandedWidth:'100%'} height={expanded?expandedWidth*canvasHeight/canvasWidth:canvasHeight} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>{children}</Svg></View>;
 return <View style={{padding:16,borderRadius:16,backgroundColor:'#F2F5ED',gap:12}}>
  <Text accessibilityRole="header" style={{fontSize:18,fontWeight:'700',color:ink}}>{title}</Text>
  {picture(false)}
  <Text style={{fontSize:16,lineHeight:25,color:ink}}>{description}</Text>
  {action(`Enlarge diagram: ${title}`,()=>{setZoom(1);setOpen(true);})}
  <Modal visible={open} animationType="none" onRequestClose={()=>setOpen(false)}>
   <SafeAreaView style={{flex:1,backgroundColor:'#F2F5ED'}} accessibilityViewIsModal onAccessibilityEscape={()=>setOpen(false)}>
    <ScrollView contentContainerStyle={{padding:18,gap:16}}>
     {action('Close enlarged diagram',()=>setOpen(false))}
     <Text accessibilityRole="header" style={{fontSize:24,fontWeight:'700',color:ink}}>{title}</Text>
     <View style={{flexDirection:'row',flexWrap:'wrap',gap:12}}>{action('Zoom out',()=>setZoom(v=>Math.max(1,v-.5)),zoom===1)}{action('Zoom in',()=>setZoom(v=>Math.min(3,v+.5)),zoom===3)}</View>
     <Text style={{fontSize:16,color:ink}}>Zoom {Math.round(zoom*100)}%. Scroll sideways to explore the whole diagram. The description below gives the same information in words.</Text>
     <ScrollView horizontal showsHorizontalScrollIndicator accessibilityLabel="Enlarged diagram, scroll horizontally" style={{borderWidth:1,borderColor:'#597867'}}>{picture(true)}</ScrollView>
     <Text selectable style={{fontSize:18,lineHeight:28,color:ink}}>{description}</Text>
    </ScrollView>
   </SafeAreaView>
  </Modal>
 </View>;
}
