import { View, Text, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import { useUpdatePost } from '@/hooks/useUpdatePost';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from '@/assets/styles/post.styles';
import AddressComponent from '@/components/Address';
import EventDateList, { EventDateListRef } from '@/components/EventDateList';
import { COLORS } from '@/constants/colors';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import ExpoCheckbox from 'expo-checkbox';
import { RadioButton } from 'react-native-paper';
import { useCategory } from '@/hooks/useCategory';
import MultiSelect from 'react-native-multiple-select';
import ImagePickerView from '@/components/ImagePickerView';
import LoadingSpinner from '@/components/LoadingSpinner';

const PostEditScreen = () => {
  const router = useRouter();
  const categorySelectRef = useRef<any>(null);
  const eventDateListRef = useRef<EventDateListRef>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const { editId } = useLocalSearchParams();
  const postId = Array.isArray(editId) ? editId[0] : editId;
  const {
    title, setTitle,
    categories, setCategories,
    imageUri,
    imageResizeOption, setImageResizeOption,
    phone, setPhone,
    email, setEmail,
    location,
    link, setLink,
    frequency,
    eventDates,
    description, setDescription,
    fee, setFee,
    paidEvent,
    address,
    loading,
    isLoadingPost,
    errorPost,
    removeImage,
    pickImage,
    handleLocationChange,
    handleFrequencyChange,
    handlePaidEventChange,
    handleEventDatesChange,
    handleAddressChange,
    updatePost,
  } = useUpdatePost(postId ?? "");

  const { categoriesData } = useCategory();

  const onSelectedCategoriesChange = (selected: string[]) => {
    setCategories(selected);
  };

  const closeOpenSelectionViews = () => {
    if (isCategoryDropdownOpen) {
      categorySelectRef.current?._clearSelectorCallback?.();
      setIsCategoryDropdownOpen(false);
    }
    eventDateListRef.current?.closePickers();
  };

  if (!postId || isLoadingPost) {
    return <LoadingSpinner message="Loading event..." />;
  }

  if (errorPost) {
    return <LoadingSpinner message="Unable to load this event." />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        style={styles.scrollViewStyle} 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={closeOpenSelectionViews}>
          {/** Header with Back Button */}
          <View style={[styles.header, { flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Feather name='arrow-left' size={24} color={COLORS.text} />
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>Edit Event</Text>
              <Text style={styles.subtitle}>Update the details of your event</Text>
            </View>
          </View>

          {/** Basic Info Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Event Title</Text>
              <View style={styles.inputContainer}>
                <Feather name='type' size={18} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder='What is the event called?'
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            <View style={styles.formGroup} onTouchStart={(e) => e.stopPropagation()}>
              <Text style={styles.label}>Category</Text>
              <MultiSelect
                ref={categorySelectRef}
                items={categoriesData}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedCategoriesChange}
                onToggleList={() => setIsCategoryDropdownOpen((isOpen) => !isOpen)}
                selectedItems={categories}
                selectText="Select categories"
                searchInputPlaceholderText="Search..."
                tagRemoveIconColor={COLORS.red}
                tagBorderColor={COLORS.border}
                tagTextColor={COLORS.textLight}
                selectedItemTextColor={COLORS.primary}
                selectedItemIconColor={COLORS.primary}
                itemTextColor={COLORS.text}
                displayKey="name"
                styleInputGroup={styles.inputContainer}
                styleTextDropdownSelected={{ color: COLORS.text, paddingLeft: 10 }}
                styleTextDropdown={{ color: COLORS.textLight, paddingLeft: 10 }}
                styleIndicator={{ paddingBottom: 25 }}
                styleDropdownMenuSubsection={styles.inputContainer4}
                hideSubmitButton={true}
                fixedHeight={true}
                styleItemsContainer={styles.inputContainer3}
                styleMainWrapper={styles.multiSelectContainer}
                styleListContainer={{ maxHeight: 200 }}
                flatListProps={{ scrollEnabled: false }}
                hideDropdown={true}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Event Banner</Text>
              <ImagePickerView
                imageUri={imageUri}
                onPickImage={pickImage}
                onRemoveImage={removeImage}
                resizeOption={imageResizeOption}
                onResizeOptionChange={setImageResizeOption}
              />
            </View>
          </View>

          {/** Contact Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Contact Details</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Feather name='phone' size={18} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder='+1 234 567 890'
                  placeholderTextColor={COLORS.placeholderText}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType='phone-pad'
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Feather name='mail' size={18} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder='hello@event.com'
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  keyboardType='email-address'
                  onChangeText={setEmail}
                />
              </View>
            </View>
          </View>

          {/** Logistics Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Logistics & Fee</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Type of Event</Text>
              <View style={styles.checkBoxContainer}>
                <TouchableOpacity 
                  style={styles.checkBoxItem} 
                  onPress={() => handleLocationChange("onsite")}
                >
                  <ExpoCheckbox
                    value={location.onsite}
                    onValueChange={() => handleLocationChange("onsite")}
                    color={location.onsite ? COLORS.primary : COLORS.textLight}
                  />
                  <Text style={styles.checkboxLabel}>Onsite</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.checkBoxItem} 
                  onPress={() => handleLocationChange("online")}
                >
                  <ExpoCheckbox
                    value={location.online}
                    onValueChange={() => handleLocationChange("online")}
                    color={location.online ? COLORS.primary : COLORS.textLight}
                  />
                  <Text style={styles.checkboxLabel}>Online</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Location & Address</Text>
              <AddressComponent address={address} onChange={handleAddressChange} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Online Link (Optional)</Text>
              <View style={styles.inputContainer}>
                <Feather name='link' size={18} color={COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder='https://zoom.us/...'
                  placeholderTextColor={COLORS.placeholderText}
                  value={link}
                  onChangeText={setLink}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Event Fee</Text>
              <RadioButton.Group
                onValueChange={value => handlePaidEventChange(value)}
                value={paidEvent}
              >
                <View style={styles.checkBoxContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                      <RadioButton.Android value="free" color={COLORS.primary} />
                      <Text style={styles.checkboxLabel}>Free</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                      <RadioButton.Android value="paid" color={COLORS.primary} />
                      <Text style={styles.checkboxLabel}>Paid</Text>
                  </View>
                </View>
              </RadioButton.Group>
              {paidEvent === "paid" && (
                <View style={styles.inputContainerFee}>
                  <Feather name='dollar-sign' size={18} color={COLORS.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder='0.00'
                    placeholderTextColor={COLORS.placeholderText}
                    value={fee?.toString()}
                    keyboardType='decimal-pad'
                    onChangeText={setFee}
                  />
                </View>
              )}
            </View>
          </View>

          {/** Schedule Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Schedule</Text>
            <EventDateList ref={eventDateListRef} eventDates={eventDates} onChange={handleEventDatesChange} />
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Recurring frequency</Text>
              <View style={styles.checkBoxContainer}>
                {['daily', 'weekly', 'monthly', 'yearly'].map((freq) => (
                  <TouchableOpacity 
                    key={freq} 
                    style={styles.checkBoxItem} 
                    onPress={() => handleFrequencyChange(freq as keyof typeof frequency)}
                  >
                    <ExpoCheckbox
                      value={frequency[freq as keyof typeof frequency]}
                      onValueChange={() => handleFrequencyChange(freq as keyof typeof frequency)}
                      color={frequency[freq as keyof typeof frequency] ? COLORS.primary : COLORS.textLight}
                    />
                    <Text style={styles.checkboxLabel}>{freq.charAt(0).toUpperCase() + freq.slice(1)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/** Description Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder='Tell people more about this event...'
              placeholderTextColor={COLORS.placeholderText}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          {/** Update Button */}
          <TouchableOpacity style={styles.button} onPress={updatePost} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <>
                <MaterialCommunityIcons name="content-save-check" size={20} color={COLORS.white} style={{marginRight: 8}} />
                <Text style={styles.buttonText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PostEditScreen;
