import React from 'react';
import { router } from 'expo-router'
import { View, Text, FlatList, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '../../../context/ThemeContext'; // Import useTheme

const nutritionTips = [
  { id: '1', title: 'ประโยชน์ของการนอนหลับ', description: 'การนอนหลับเป็นสิ่งจำเป็นต่อร่างกายและจิตใจ ไม่เพียงแต่ช่วยให้ร่างกายได้พักผ่อน แต่ยังส่งผลต่อระบบต่าง ๆ ในร่างกาย เช่น สมอง หัวใจ ระบบภูมิคุ้มกัน และสุขภาพโดยรวม', image: require('../../../assets/images/sleep-1.jpg') },
  { id: '2', title: 'ตัวอย่างประโยชน์ของการนอนหลับที่ดี', description: '• ช่วยให้สมองทำงานได้ดีขึ้น : การนอนช่วยให้สมองจัดเก็บข้อมูล เพิ่มประสิทธิภาพในการเรียนรู้ ความจำ และการตัดสินใจหากนอนหลับไม่เพียงพอ อาจทำให้สมองล้า ความจำแย่ และมีปัญหาในการโฟกัส\n• ฟื้นฟูร่างกายและซ่อมแซมเซลล์ต่าง ๆ : ขณะนอนหลับ ร่างกายจะซ่อมแซมกล้ามเนื้อ เนื้อเยื่อ และอวัยวะต่าง ๆช่วยให้ร่างกายฟื้นตัวจากความเหนื่อยล้าและความเครียด\n• เสริมสร้างระบบภูมิคุ้มกัน : การนอนช่วยให้ร่างกายผลิตเซลล์เม็ดเลือดขาวที่ช่วยต้านเชื้อโรคและป้องกันการติดเชื้อหากนอนไม่พอ อาจทำให้ร่างกายอ่อนแอและป่วยง่าย\n• ลดความเสี่ยงโรคหัวใจและความดันโลหิต : การนอนช่วยให้หัวใจได้พัก ลดความดันโลหิต และลดความเสี่ยงของโรคหัวใจและหลอดเลือดการอดนอนอาจเพิ่มระดับความเครียดและอาการอักเสบ ซึ่งส่งผลต่อหัวใจ', image: require('../../../assets/images/sleep-2.png') },
  { id: '3', title: 'นอนวันละกี่ชั่วโมงถึงเพียงพอ?', description: 'วัยเด็ก (6-12 ปี) → 9-12 ชั่วโมง\nวัยรุ่น (13-18 ปี) → 8-10 ชั่วโมง\nผู้ใหญ่ (18-60 ปี) → 7-9 ชั่วโมง\nผู้สูงอายุ (60 ปีขึ้นไป) → 7-8 ชั่วโมง', image: require('../../../assets/images/sleep-3.jpg') },
  { id: '4', title: 'เคล็ดลับการนอนหลับให้มีคุณภาพ', description: '• เข้านอนและตื่นนอนให้เป็นเวลา\n• หลีกเลี่ยงคาเฟอีน แอลกอฮอล์ และอาหารมื้อหนักก่อนนอน\n• ปิดอุปกรณ์อิเล็กทรอนิกส์ เช่น มือถือ และคอมพิวเตอร์ก่อนนอนอย่างน้อย 30 นาที\n• ทำห้องนอนให้เงียบ สงบ และมีอุณหภูมิที่เหมาะสม\n• ออกกำลังกายเป็นประจำ แต่ไม่ควรออกกำลังกายหนักก่อนนอน', image: require('../../../assets/images/sleep-4.jpg') },
];

const NutritionTipsScreen = () => {
  const { theme } = useTheme(); // Use theme from context

  return (
    <SafeAreaProvider>
      <SafeAreaView style={theme === "light" ? styles.containerLight : styles.containerDark}>
        <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/Discover"})}>
                <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>การนอนหลับที่ดี</Text>
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  containerLight: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  containerDark: { flex: 1, padding: 16, backgroundColor: '#222' },
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