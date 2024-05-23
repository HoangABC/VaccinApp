import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController, logout } from '../../src/context';

const Personal = () => {
  const [loading, setLoading] = useState(true);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const navigation = useNavigation();
  const ref = firestore().collection('USERS');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      if (loading) {
        setLoading(false);
      }
    });
  }, [loading]);

  if (loading) {
    return null;
  }
  const handleLogout = () => {
    logout(dispatch, navigation); 
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
        <Appbar.Action 
            icon={() => <MaterialCommunityIcons name="bell-outline" size={24} color="white" />} 
            onPress={() => {}} 
          />
          <View style={styles.userInfo}>
            <MaterialCommunityIcons
              name="account-circle"
              size={80}
              color={COLORS.white}
            />
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>{userLogin ? userLogin.fullName : 'Guest'}</Text>
              <Text style={styles.userDetails}>
                {userLogin ? userLogin.phone : 'N/A'} - {userLogin ? userLogin.gender : 'N/A'} - {userLogin ? userLogin.dateOfBirth : 'N/A'}
              </Text>
            </View>

          </View>
        </Appbar.Header>
        <ScrollView style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="account-edit" size={24} color={COLORS.blue} onPress={() => navigation.navigate('UpdateInfo')}/>
            <Text style={styles.menuItemText} onPress={() => navigation.navigate('UpdateInfo')}>Chỉnh sửa tài khoản</Text>
          </View>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="clipboard-list" size={24} color={COLORS.blue} />
            <Text style={styles.menuItemText}>Quản lý hồ sơ tiêm chủng</Text>
          </View>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="gift-outline" size={24} color={COLORS.blue} />
            <Text style={styles.menuItemText}>Ưu đãi của tôi</Text>
          </View>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="account-search" size={24} color={COLORS.blue} />
            <Text style={styles.menuItemText}>Tra cứu điểm thưởng</Text>
          </View>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons name="lock-reset" size={24} color={COLORS.blue} />
            <Text style={styles.menuItemText}>Đổi mật khẩu</Text>
          </View>
          <View style={styles.menuItem}>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}> 
            <MaterialCommunityIcons name="logout" size={24} color={COLORS.blue} />
            <Text style={styles.menuItemText}>Đăng xuất</Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.contactHeader}>Thông tin liên hệ</Text>
          <View style={styles.contactItem}>
            <Text style={styles.contactItemText}>Tâm Anh TP. HCM</Text>
            <Text style={styles.contactItemPhone}>0287 102 6789</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactItemText}>Tâm Anh Hà Nội</Text>
            <Text style={styles.contactItemPhone}>024 3872 3872</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactItemText}>VNVC</Text>
            <Text style={styles.contactItemPhone}>028 7102 6595</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactItemText}>Nutrihome</Text>
            <Text style={styles.contactItemPhone}>1900 633 599</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: COLORS.blue,
    height: '24%', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', 
  },
  userInfo: {
    marginTop:120,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    flex: 1,
    height: 150, 
    marginStart:-37,
  },
  userInfoText: {
    marginLeft: 10,
    alignItems: 'center',
    marginStart:-3,
  },
  userName: {
    color: COLORS.white,
    fontSize: 18,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  userDetails: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 15,
  },
  contactHeader: {
    fontSize: 18,
    color: COLORS.black,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  contactItemText: {
    fontSize: 16,
    color: COLORS.black,
  },
  contactItemPhone: {
    fontSize: 16,
    color: COLORS.blue,
  },
});


export default Personal;
