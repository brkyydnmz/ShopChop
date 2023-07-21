import React from 'react';
import {FlatList} from 'react-native';
import Config from 'react-native-config';

import ProductCard from '../../components/ProductCard';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

//YUKARIYA ARAMA BUTONU EKLENEBİLİR
//https://fakestoreapi.com/products/categories BURDAN KATEGORİLERİ GETİREBİLİRSİN. CATEGORY GÖRE FİLTRELEME EKLENEBİLİR.

const Products = ({navigation}) => {
  const {loading, data, error} = useFetch(Config.API_URL); //custom hookumuzdan kullandık.

  const handleProductSelect = id => {
    navigation.navigate('DetailPage', {id}); //id parametresini detail page e gönderiyoruz
  };

  const renderProduct = ({item}) => (
    <ProductCard product={item} onSelect={() => handleProductSelect(item.id)} />
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return <FlatList data={data} renderItem={renderProduct} />;
};

export default Products;
