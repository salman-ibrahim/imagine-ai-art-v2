import { Button, Divider, Icon, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React from 'react'
import { ScrollView, View } from 'react-native';

const DailyCheckin = () => {

    const styles = useStyleSheet(themedStyles);
    
    const checkIcon = (props) => (
        <Icon {...props} name='checkmark-outline'/>
    );

    return (
        <View style={styles.container}>
            <Text category='h4'>Daily Bonus</Text>
            <ScrollView horizontal style={styles.pointsContainer}>
                
                {/* Claimed Day */}
                <View style={styles.dayContainer}>
                    <Icon height={20} width={20} name='arrow-down'/>
                    <View style={styles.completedPointCircle}>
                        <Icon fill='#000000' height={20} width={20} name='checkmark-circle-2-outline'/>
                    </View>
                    <Text>Day 1</Text>
                </View>
                <View style={styles.dividerView}>
                    <Divider style={styles.divider}/>
                </View>
                {/* !Claimed Day */}

                {/* Active Day */}
                <View style={styles.dayContainer}>
                <Icon style={styles.tintColor} height={20} width={20} name='arrow-down'/>
                    <View style={styles.pointsCircle}>
                        <Text style={styles.textDark}>+5</Text>
                    </View>
                    <Text>Day 2</Text>
                </View>
                <View style={styles.dividerView}>
                    <Divider style={styles.divider}/>
                </View>
                {/* !Active Day */}

                {/* Single Day */}
                <View style={styles.dayContainer}>
                    <Icon height={20} width={20} name='arrow-down'/>
                    <View style={styles.pointsCircle}>
                        <Text style={styles.textDark}>+5</Text>
                    </View>
                    <Text>Day 3</Text>
                </View>
                <View style={styles.dividerView}>
                    <Divider style={styles.divider}/>
                </View>
                {/* !Single Day */}

                {/* Single Day */}
                <View style={styles.dayContainer}>
                    <Icon height={20} width={20} name='arrow-down'/>
                    <View style={styles.pointsCircle}>
                        <Text style={styles.textDark}>+10</Text>
                    </View>
                    <Text>Day 4</Text>
                </View>
                <View style={styles.dividerView}>
                    <Divider style={styles.divider}/>
                </View>
                {/* !Single Day */}

                {/* Single Day */}
                <View style={styles.dayContainer}>
                    <Icon height={20} width={20} name='arrow-down'/>
                    <View style={styles.pointsCircle}>
                        <Text style={styles.textDark}>+10</Text>
                    </View>
                    <Text>Day 5</Text>
                </View>
                <View style={styles.dividerView}>
                    <Divider style={styles.divider}/>
                </View>
                {/* !Single Day */}

                {/* Single Day */}
                <View style={styles.dayContainer}>
                    <Icon height={20} width={20} name='arrow-down'/>
                    <View style={styles.pointsCircle}>
                        <Text style={styles.textDark}>+15</Text>
                    </View>
                    <Text>Day 6</Text>
                </View>
                <View style={styles.dividerView}>
                    <Divider style={styles.divider}/>
                </View>
                {/* !Single Day */}

                {/* Single Day */}
                <View style={styles.dayContainer}>
                    <Icon height={20} width={20} name='arrow-down'/>
                    <View style={styles.pointsCircle}>
                        <Text style={styles.textDark}>+20</Text>
                    </View>
                    <Text>Day 7</Text>
                </View>
                {/* !Single Day */}
            </ScrollView>

            <Button style={styles.button} appearance='outline'>Claim +5</Button>
        </View>
    )
}

export default DailyCheckin;

const themedStyles = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-1',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: 'color-basic-1100',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        elevation: 1,
        marginBottom: 20,
    },
    pointsContainer: {
        
    },
    dayContainer: {
        flex: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
    },
    pointsCircle: {
        backgroundColor: 'background-basic-color-4',
        height: 30,
        width: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedPointCircle: {
        backgroundColor: 'color-success-500',
        height: 30,
        width: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dividerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: 20,
        backgroundColor: 'text-basic-color'
    },    
    button: {
        marginTop: 20,
    },
    tintColor: {
        tintColor: 'text-basic-color'
    }
});