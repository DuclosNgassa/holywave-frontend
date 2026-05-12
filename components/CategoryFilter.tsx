import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "@/assets/styles/home.styles";
import { ImageSourcePropType } from "react-native";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {

     const categoryImages: Record<string, ImageSourcePropType> = {
        "church service": require("../assets/images/categories/church.jpg"),
        concert: require("../assets/images/categories/concert.jpg"),
        conference: require("../assets/images/categories/conference.jpg"),
        evangelization: require("../assets/images/categories/evangelization.jpg"),
        others: require("../assets/images/categories/others.jpg"),
        prayer: require("../assets/images/categories/prayer.jpg"),
        workshop: require("../assets/images/categories/workshop.jpg"),
    };

    //concert, conference, evangelization, others, prayer, workshop, church service
    
    const othersCategory = categories.find(item => item.name === "Others");
    const sortedCategories = categories
        .slice() // copy to avoid mutating original
        .filter(item => item.name !== othersCategory.name)
        .sort((a, b) => a.name.localeCompare(b.name)) // alphabetical
        .concat(othersCategory); // add selected to end

    return (
        <View style={styles.categoryFilterContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryFilterScrollContent}
            >
                {sortedCategories.map((category) => {
                    const isSelected = selectedCategory === category.id;
                    //const imageName = category.name.toLowerCase();
                    return (
                        <TouchableOpacity
                            key={category.id}
                            style={[styles.categoryButton, isSelected && styles.selectedCategory]}
                            onPress={() => onSelectCategory(category.id, category.name)}
                            activeOpacity={0.7}
                        >
                           {  /* <Image source={categoryImages[imageName]}
                                style={[styles.categoryImage, isSelected && styles.selectedCategoryImage]}
                                contentFit="cover"
                                transition={300}
                            /> */}
                             <Text
                                style={[styles.categoryText, isSelected && styles.selectedCategoryText]}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default CategoryFilter