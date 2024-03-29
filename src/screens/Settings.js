import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import VersionCheck from 'react-native-version-check';

import {ScreenTemplate, Dropdown, Text, Button} from '../atoms';
import {LANGUAGES} from '../config/localization/languages';
import {CURRENCIES} from '../config/localization/currencies';
import {usePreferencesState} from '../context/preferences.provider';
import {margin, padding} from '../styles/spacing';
import {ExitModal, SeedModal} from '../molecules';

const Settings = () => {
  const {lang, currency} = usePreferencesState();
  const {t} = useTranslation();
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);
  const [isSeedModalVisible, setIsSeedModalVisible] = useState(false);
  const version = `${VersionCheck.getCurrentVersion()}(${VersionCheck.getCurrentBuildNumber()})`;

  const openExitModal = () => setIsExitModalVisible(true);
  const closeExitModal = () => setIsExitModalVisible(false);
  const openSeedModal = () => setIsSeedModalVisible(true);
  const closeSeedModal = () => setIsSeedModalVisible(false);

  return (
    <ScreenTemplate>
      <ExitModal isVisible={isExitModalVisible} onClose={closeExitModal} />
      <SeedModal isVisible={isSeedModalVisible} onClose={closeSeedModal} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text variant="title">{t('settings.currency')}</Text>
          <Dropdown
            id="currency"
            data={CURRENCIES}
            placeholder={'Select currency'}
            selectedValue={currency.value}
            zIndex={2000}
            zIndexInverse={1000}
          />
          <Text variant="title">{t('settings.lang')}</Text>
          <Dropdown
            id="lang"
            data={LANGUAGES}
            placeholder={'Select language'}
            selectedValue={lang}
            zIndex={1000}
            zIndexInverse={2000}
          />
          <Text variant="title" align="center">
            v{version}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text={t('settings.btn.show')}
            variant="primary"
            onPress={openSeedModal}
          />
          <Button
            text={t('settings.btn.reset')}
            variant="outline"
            onPress={openExitModal}
          />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export {Settings};

const styles = StyleSheet.create({
  container: {
    paddingVertical: padding.md,
    paddingHorizontal: padding.sm,
    flex: 1,
  },
  content: {
    flex: 1,
    gap: margin.md,
  },
  buttonContainer: {
    gap: margin.md,
  },
});
