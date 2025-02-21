import React from 'react';
import { router } from 'expo-router'
import { View, Text, FlatList, Image, StyleSheet,TouchableOpacity } from 'react-native';

const nutritionTips = [
  { id: '1', title: 'กินโปรตีนให้เพียงพอ', description: 'ช่วยเสริมสร้างกล้ามเนื้อ และซ่อมแซมส่วนที่สึกหรอ', image: require('../../../assets/images/protein.png') },
  { id: '2', title: 'หลีกเลี่ยงน้ำตาลและของหวาน', description: 'ช่วยลดไขมันสะสมและควบคุมน้ำหนักได้ดีขึ้น', image: require('../../../assets/images/sugar.jpg') },
  { id: '3', title: 'กินไขมันดี', description: 'เช่น อะโวคาโด ถั่ว น้ำมันมะกอก ช่วยให้ร่างกายทำงานสมดุล', image: require('../../../assets/images/oil.png') },
  { id: '4', title: 'ดื่มน้ำให้เพียงพอ', description: 'ช่วยให้ร่างกายขับของเสียและทำงานได้อย่างมีประสิทธิภาพ', image: require('../../../assets/images/water.jpg') },
  { id: '5', title: 'กินผักและผลไม้', description: 'เสริมวิตามินและแร่ธาตุที่จำเป็นต่อร่างกาย', image: require('../../../assets/images/vegie.png') },
  { id: '6', title: 'หลีกเลี่ยงอาหารแปรรูป', description: 'ลดสารปรุงแต่งและโซเดียมที่อาจส่งผลเสียต่อสุขภาพ', image: require('../../../assets/images/junk.jpg') },
];

const NutritionTipsScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/Discover"})}>
              <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>โภชนาการสำหรับผู้ออกกำลังกาย</Text>
      <FlatList
        data={nutritionTips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1f66f2', marginBottom: 16, textAlign: 'center' },
  item: { 
    marginBottom: 10, 
    padding: 15, 
    backgroundColor: '#ffffff', 
    borderRadius: 12, 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4,
    alignItems: 'center'
  },
  image: { width: 200, height: 200, borderRadius: 10, marginBottom: 10, marginTop: 10 },
  itemTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' ,marginBottom:10},
  itemDescription: { fontSize: 18, color: '#555', marginTop: 5, textAlign: 'center' },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign :'center',
    fontWeight: "bold",
  },

  button: { 
    backgroundColor: "#dc143c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "25%",
    alignItems: "center",
    marginBottom :10
  },
});

export default NutritionTipsScreen;