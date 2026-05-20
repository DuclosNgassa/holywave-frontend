import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "@/assets/styles/home.styles";
import { ImageSourcePropType } from "react-native";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {

    const sortedCategories = categories
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <View style={styles.categoryFilterContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryFilterScrollContent}
            >
                {/* "All" Category Chip */}
                <TouchableOpacity
                    style={[styles.categoryButton, selectedCategory === "" && styles.selectedCategory]}
                    onPress={() => onSelectCategory("", "All")}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.categoryText, selectedCategory === "" && styles.selectedCategoryText]}>
                        All
                    </Text>
                </TouchableOpacity>

                {sortedCategories.map((category) => {
                    const isSelected = selectedCategory === category.id;
                    return (
                        <TouchableOpacity
                            key={category.id}
                            style={[styles.categoryButton, isSelected && styles.selectedCategory]}
                            onPress={() => onSelectCategory(category.id, category.name)}
                            activeOpacity={0.7}
                        >
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