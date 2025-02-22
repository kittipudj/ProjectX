import React from 'react';
import { router } from 'expo-router'
import { View, Text, FlatList, Image, StyleSheet,TouchableOpacity } from 'react-native';

const nutritionTips = [
  { id: '1', title: 'Warm-Up คืออะไร?', description: 'Warm-Up (วอร์มอัพ) คือการเตรียมร่างกายก่อนออกกำลังกาย เพื่อกระตุ้นระบบไหลเวียนโลหิต เพิ่มอุณหภูมิร่างกาย และลดความเสี่ยงในการบาดเจ็บ', image: require('../../../assets/images/warm-1.jpg') },
  { id: '2', title: 'ประโยชน์ของการ Warm-Up', description: '• กระตุ้นระบบไหลเวียนโลหิตและเพิ่มอุณหภูมิกล้ามเนื้อ\n• ลดความเสี่ยงของอาการบาดเจ็บ เช่น กล้ามเนื้อฉีกขาด\n• ช่วยเพิ่มความยืดหยุ่นของกล้ามเนื้อและข้อต่อ\n• เตรียมระบบประสาทให้พร้อมรับแรงกระทำ\n• ทำให้ร่างกายพร้อมสำหรับการออกแรงสูงสุด', image: require('../../../assets/images/warm-2.jpg') },
  { id: '3', title: 'ประเภทของการ Warm-Up', description: 'Dynamic Warm-Up \n(การวอร์มแบบเคลื่อนไหว)เหมาะกับการออกกำลังกายทุกประเภทกระตุ้นระบบประสาทและไหลเวียนโลหิต\nตัวอย่าง:Jumping Jacks (กระโดดตบ) - 30 วินาที  Arm Circles (หมุนแขน) - 15 วินาที\n\nStatic Stretching\n(การยืดแบบคงที่)ค้างท่าที่ยืดกล้ามเนื้อเป็นเวลา 15-30 วินาทีควรทำหลังจาก Dynamic Warm-Up หรือหลังออกกำลังกาย\nตัวอย่าง:Hamstring Stretch (ยืดหลังต้นขา) Quadriceps Stretch (ยืดหน้าขา)', image: require('../../../assets/images/warm-3.jpg') },
  { id: '4', title: '⚠️ ข้อควรระวัง', description: '🚫 อย่าทำ Static Stretching มากเกินไปก่อนออกกำลังกายที่ใช้แรงมาก\n🚫 หลีกเลี่ยงการเคลื่อนไหวรุนแรงขณะร่างกายยังไม่พร้อม\n🚫 ค่อย ๆ เพิ่มความเข้มข้นของการ Warm-Up', image: require('../../../assets/images/warm-4.jpg') },
];

const NutritionTipsScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/Discover"})}>
              <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>การ Warm-Up ก่อนออกกำลังกาย</Text>
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
  itemDescription: { fontSize: 18, color: '#555', marginTop: 5, textAlign: 'left' },

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