import React from 'react';
import { router } from 'expo-router'
import { View, Text, FlatList, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '../../../context/ThemeContext'; // Import useTheme

const nutritionTips = [
  { id: '1', title: 'ประโยชน์ของการดื่มน้ำเปล่า', description: 'การดื่มน้ำเป็นสิ่งจำเป็นต่อร่างกาย เพราะร่างกายมนุษย์ประกอบด้วยน้ำประมาณ 60-70% น้ำช่วยให้ระบบต่าง ๆ ในร่างกายทำงานได้อย่างมีประสิทธิภาพ', image: require('../../../assets/images/water-1.jpg') },
  { id: '2', title: 'ตัวอย่างประโยชน์ของการดื่มน้ำเปล่า', description: '•ช่วยให้ระบบไหลเวียนโลหิตดีขึ้น : น้ำช่วยให้เลือดไหลเวียนได้ดี ลดความเสี่ยงของโรคหัวใจและความดันโลหิตสูง\n•เพิ่มประสิทธิภาพของสมอง : สมองต้องการน้ำเพื่อทำงานได้อย่างเต็มที่ การขาดน้ำอาจทำให้เกิดอาการสมองล้า ความจำแย่ และไม่มีสมาธิ\n•ช่วยระบบย่อยอาหารและขับถ่าย : น้ำช่วยให้กระเพาะอาหารและลำไส้ทำงานได้ดี ป้องกันอาการท้องผูก และช่วยให้ร่างกายขับของเสียออกทางปัสสาวะและอุจจาระ\n•ช่วยให้ผิวพรรณสดใสและชุ่มชื้น : น้ำช่วยให้เซลล์ผิวอุ้มน้ำ ลดปัญหาผิวแห้ง ริ้วรอย และช่วยให้ผิวดูเปล่งปลั่งจากภายใน\n•ควบคุมน้ำหนักและช่วยลดความหิว : น้ำช่วยกระตุ้นระบบเผาผลาญ (Metabolism) และช่วยลดความอยากอาหาร ทำให้เรากินน้อยลง', image: require('../../../assets/images/water-2.jpg') },
  { id: '3', title: 'ดื่มน้ำวันละเท่าไหร่ถึงเพียงพอ?', description: 'ปริมาณที่แนะนำทั่วไป:\nผู้ชาย : ควรดื่ม 3-3.7 ลิตร (ประมาณ 8-10 แก้ว) ต่อวัน\nผู้หญิง : ควรดื่ม 2-2.7 ลิตร (ประมาณ 6-8 แก้ว) ต่อวัน\nนักกีฬา/ผู้ที่ออกกำลังกายหนัก : ควรดื่มมากขึ้นเพื่อชดเชยการเสียเหงื่อ', image: require('../../../assets/images/water-3.jpg') },
  { id: '4', title: '⚠️ ข้อควรระวังเกี่ยวกับการดื่มน้ำ', description: '🚫 ดื่มน้ำมากเกินไป (เกิน 5 ลิตรต่อวัน) อาจทำให้เกิดภาวะ น้ำเป็นพิษ (Water Intoxication)\n🚫 หลีกเลี่ยงการดื่มน้ำเย็นจัดทันทีหลังออกกำลังกาย อาจทำให้เกิดอาการจุกเสียด', image: require('../../../assets/images/water-4.jpg') },
];

const NutritionTipsScreen = () => {
  const { theme } = useTheme(); // Use theme from context

  return (
    <SafeAreaProvider>
      <SafeAreaView style={theme === "light" ? styles.containerLight : styles.containerDark}>
        <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/Discover"})}>
                <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ประโยชน์ของการดื่มน้ำเปล่า</Text>
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