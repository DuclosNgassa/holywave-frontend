import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import styles from '@/assets/styles/post.styles';
import { Feather } from '@expo/vector-icons';
import Checkbox from "expo-checkbox";
import { RadioButton } from 'react-native-paper';
import EventDateList, { EventDateListRef } from '@/components/EventDateList';
import AddressComponent from '@/components/Address';
import { useCreatePost } from '@/hooks/useCreatePost';
import { useCategory } from '@/hooks/useCategory';
import { COLORS } from '@/constants/colors';
import MultiSelect from 'react-native-multiple-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Location } from '../models/types';
import ImagePickerView from '@/components/ImagePickerView';


const PostScreen = () => {
  const categorySelectRef = useRef<any>(null);
  const eventDateListRef = useRef<EventDateListRef>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const {
    title, setTitle,
    categories, setCategories,
    imageUri,
    imageResizeOption, setImageResizeOption,
    address,
    phone, setPhone,
    email, setEmail,
    location,
    eventDates, setEventDates,
    link, setLink,
    frequency,
    description, setDescription,
    fee, setFee,
    paidEvent,
    loading, setLoading,
    isCreating,
    removeImage,
    createPost,
    pickImage,
    handleLocationChange,
    handleFrequencyChange,
    handlePaidEventChange,
    handleEventDatesChange,
    handleAddressChange,
  } = useCreatePost();

  const { categoriesData, isLoadingCategories, errorCategories } = useCategory();

  if (isLoadingCategories) {
  }
  if (errorCategories) {
    console.log("Error: ", errorCategories);
  }

  const onSelectedCategoriesChange = (selected) => {
    setCategories(selected);
    console.log("SelectedItems: ", selected);
  };

  const closeCategoryDropdown = () => {
    if (isCategoryDropdownOpen) {
      categorySelectRef.current?._clearSelectorCallback?.();
      setIsCategoryDropdownOpen(false);
    }
  };

  const closeOpenSelectionViews = () => {
    closeCategoryDropdown();
    eventDateListRef.current?.closePickers();
  };

  return (

    <KeyboardAwareScrollView
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.container}
    >
      <Pressable style={styles.card} onPress={closeOpenSelectionViews}>
        {/**Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Add Event recommendation</Text>
          <Text style={styles.subtitle}>Share upcoming events with others</Text>
        </View>
        {/**Form */}
        <View style={styles.form}>
          {/** Title */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Event title</Text>
            <View style={styles.inputContainer}>
              <Feather
                name='book'
                size={20}
                color={COLORS.textSecondary}
                style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder='Enter the event´s title'
                placeholderTextColor={COLORS.placeholderText}
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>
          {/** Categories */}
          <View
            onTouchStart={(event) => event.stopPropagation()}
          >
            <MultiSelect
              ref={categorySelectRef}
              items={categoriesData}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedCategoriesChange}
              onToggleList={() => setIsCategoryDropdownOpen((isOpen) => !isOpen)}
              onClearSelector={() => setIsCategoryDropdownOpen(false)}
              selectedItems={categories}
              selectText="Pick category"
              searchInputPlaceholderText="Search Items..."
              tagRemoveIconColor={COLORS.red}
              tagBorderColor={COLORS.border}
              tagTextColor={COLORS.textSecondary}
              selectedItemTextColor={COLORS.primary}
              selectedItemIconColor={COLORS.primary}
              itemTextColor="#000"
              displayKey="name"
              styleInputGroup={styles.inputContainer}
              styleTextDropdownSelected={{ color: COLORS.textPrimary, paddingLeft: 10 }}
              styleTextDropdown={{ color: COLORS.textSecondary, paddingLeft: 10 }}
              styleIndicator={{ paddingBottom: 25 }}
              styleDropdownMenuSubsection={styles.inputContainer4}
              submitButtonText="Submit"
              hideSubmitButton={true}
              fixedHeight={true}
              styleItemsContainer={styles.inputContainer3}
              styleMainWrapper={styles.inputContainer2}
              flatListProps={{
                scrollEnabled: false,            // disable internal scrolling
                // If needed, pass extraProps like onEndReachedThreshold, etc.
              }}
              styleListContainer={{ maxHeight: 256 }}
              hideDropdown={true}
            />
          </View>

          {/* Image */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Book image</Text>
            <ImagePickerView
              imageUri={imageUri}
              onPickImage={pickImage}
              onRemoveImage={removeImage}
              resizeOption={imageResizeOption}
              onResizeOptionChange={setImageResizeOption}
            />
          </View>
          {/* Telephone */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Contact</Text>
            <View style={styles.inputContainer}>
              <Feather
                name='phone'
                size={20}
                color={COLORS.textSecondary}
                style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder='Phone number'
                placeholderTextColor={COLORS.placeholderText}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
          {/* Email */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Feather
                name='mail'
                size={20}
                color={COLORS.textSecondary}
                style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder='example@eaxample.comr'
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                keyboardType='email-address'
                onChangeText={setEmail}
              />
            </View>
          </View>
          {/* Location */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Loaction</Text>
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBoxItem}>
                <Checkbox
                  value={location.onsite}
                  onValueChange={() => handleLocationChange("onsite")}
                  color={location.onsite ? COLORS.primary : COLORS.textSecondary}
                />
                <Text style={styles.checkboxLabel}>Onsite</Text>
              </View>
              <View style={styles.checkBoxItem}>
                <Checkbox
                  value={location.online}
                  onValueChange={() => handleLocationChange("online")}
                  color={location.online ? COLORS.primary : COLORS.textSecondary}
                />
                <Text style={styles.checkboxLabel}>Online</Text>
              </View>
            </View>
          </View>
          {/** Address */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <AddressComponent address={address} onChange={handleAddressChange} />
          </View>
          {/* Link */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Online link</Text>
            <View style={styles.inputContainer}>
              <Feather
                name='link'
                size={20}
                color={COLORS.textSecondary}
                style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder='Link for online'
                placeholderTextColor={COLORS.placeholderText}
                value={link}
                onChangeText={setLink}
              />
            </View>
          </View>
          {/** Date and time */}
          <EventDateList ref={eventDateListRef} eventDates={eventDates} onChange={handleEventDatesChange} />
          {/** Frequency */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBoxItem}>
                <Checkbox
                  value={frequency.daily}
                  onValueChange={() => handleFrequencyChange("daily")}
                  color={frequency.daily ? COLORS.primary : COLORS.textSecondary}
                />
                <Text style={styles.checkboxLabel}>Daily</Text>
              </View>

              <View style={styles.checkBoxItem}>
                <Checkbox
                  value={frequency.weekly}
                  onValueChange={() => handleFrequencyChange("weekly")}
                  color={frequency.weekly ? COLORS.primary : COLORS.textSecondary}
                />
                <Text style={styles.checkboxLabel}>Weekly</Text>
              </View>
              <View style={styles.checkBoxItem}>
                <Checkbox
                  value={frequency.monthly}
                  onValueChange={() => handleFrequencyChange("monthly")}
                  color={frequency.monthly ? COLORS.primary : COLORS.textSecondary}
                />
                <Text style={styles.checkboxLabel}>Monthly</Text>
              </View>
              <View style={styles.checkBoxItem}>
                <Checkbox
                  value={frequency.yearly}
                  onValueChange={() => handleFrequencyChange("yearly")}
                  color={frequency.yearly ? COLORS.primary : COLORS.textSecondary}
                />
                <Text style={styles.checkboxLabel}>Yearly</Text>
              </View>
            </View>
          </View>
          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder='Write additional info about the event...'
              placeholderTextColor={COLORS.placeholderText}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
          {/* Event fee */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Event Fee</Text>
            <RadioButton.Group
              onValueChange={value => handlePaidEventChange(value)}
              value={paidEvent}
            >
              <View style={styles.checkBoxContainer}>
                <RadioButton.Item style={styles.radioItemFee} label="Free" value="free" />
                <RadioButton.Item style={styles.radioItemFee} label="Paid" value="paid" />
                {paidEvent === "paid" && (
                  <View style={styles.inputContainerFee}>
                    <Feather
                      name='dollar-sign'
                      size={20}
                      color={COLORS.textSecondary}
                      style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder='Amount'
                      placeholderTextColor={COLORS.placeholderText}
                      value={fee}
                      keyboardType='decimal-pad'
                      onChangeText={setFee}
                    />
                  </View>
                )}
              </View>
            </RadioButton.Group>
          </View>
          {/** Share button */}
          <TouchableOpacity style={styles.button} onPress={createPost} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Share</Text>
            )}
          </TouchableOpacity>
        </View>
      </Pressable>
    </KeyboardAwareScrollView>
  )
}

export default PostScreen
