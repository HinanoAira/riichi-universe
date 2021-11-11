/*
 * @Copyright https://github.com/takayama-lily/syanten
 */
(()=>{
    'use strict'
    const sum = (arr)=>{
        let s = 0
        for (let i = 0; i < arr.length; i++)
            s += arr[i]
        return s
    }
    const syanten = (hai_arr)=>{
        let res = 9
        let mentsu, tatsu, alone, furo
        mentsu = tatsu = alone = furo = 0
        const search = (arr, is_jihai = false)=>{
            is_jihai = false;
            let tmp1 = [0, 0, 0]
            let tmp2 = [0, 0, 0]
            {
                let arr1 = [...arr]
                let tmp_mentsu = 0
                let tmp_tatsu = 0
                let tmp_alone = 0
                for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i] === 0 || arr1[i] === undefined)
                        continue
                    while (arr1[i] >= 3)
                        arr1[i] -= 3, tmp_mentsu++
                    if (arr1[i] > 0) {
                        if (is_jihai) continue
                        if (arr1[(i + 1) % arr1.length] > 0 && arr1[(i + 2) % arr1.length] > 0) {
                            arr1[i]--, arr1[(i + 1) % arr1.length]--, arr1[(i + 2) % arr1.length]--, tmp_mentsu++
                        }
                        if (arr1[i] > 0 && arr1[(i + 1) % arr1.length] > 0 && arr1[(i + 2) % arr1.length] > 0) {
                            arr1[i]--, arr1[(i + 1) % arr1.length]--, arr1[(i + 2) % arr1.length]--, tmp_mentsu++
                        }
                    }
                }
                for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i] === 0 || arr1[i] === undefined) {
                        continue
                    } else if (arr1[i] === 2) {
                        arr1[i] -= 2, tmp_tatsu++
                        continue
                    } else {
                        if (is_jihai) continue
                        if (arr1[(i + 1) % arr1.length] > 0) {
                            arr1[i]--, arr1[(i + 1) % arr1.length]--, tmp_tatsu++
                        }
                        if (arr1[(i + 2) % arr1.length] > 0) {
                            arr1[i]--, arr1[(i + 2) % arr1.length]--, tmp_tatsu++
                        }
                    }
                }
                tmp_alone += sum(arr1)
                tmp1 = [tmp_mentsu, tmp_tatsu, tmp_alone]
            } {
                let arr2 = [...arr]
                let tmp_mentsu = 0
                let tmp_tatsu = 0
                let tmp_alone = 0
                for (let i = 0; i < arr2.length; i++) {
                    if (arr2[i] === 0 || arr2[i] === undefined)
                        continue
                    if (!is_jihai) {
                        if (arr2[i] >= 2 && arr2[(i + 1) % arr2.length] >= 2 && arr2[(i + 2) % arr2.length] >= 2)
                            arr2[i] -= 2, arr2[(i + 1) % arr2.length] -= 2, arr2[(i + 2) % arr2.length] -= 2, tmp_mentsu += 2
                        if (arr2[i] >= 2 && arr2[(i + 1) % arr2.length] >= 2 && arr2[(i + 2) % arr2.length] >= 2)
                            arr2[i] -= 2, arr2[(i + 1) % arr2.length] -= 2, arr2[(i + 2) % arr2.length] -= 2, tmp_mentsu += 2
                    }
                    if (arr2[i] === 3 || arr2[i] === 4)
                        arr2[i] -= 3, tmp_mentsu++
                    if (arr2[i] === 2)
                        arr2[i] -= 2, tmp_tatsu++
                    if (is_jihai)
                        continue
                    if (arr2[i] > 0 && arr2[(i + 1) % arr2.length] > 0 && arr2[(i + 2) % arr2.length] > 0)
                        arr2[i]--, arr2[(i + 1) % arr2.length]--, arr2[(i + 2) % arr2.length]--, tmp_mentsu++
                    if (arr2[i] > 0 && arr2[(i + 1) % arr2.length] > 0)
                        arr2[i]--, arr2[(i + 1) % arr2.length]--, tmp_tatsu++
                    if (arr2[i] > 0 && arr2[(i + 2) % arr2.length] > 0)
                        arr2[i]--, arr2[(i + 2) % arr2.length]--, tmp_tatsu++
                }
                tmp_alone += sum(arr2)
                tmp2 = [tmp_mentsu, tmp_tatsu, tmp_alone]
            }
            let tmp = tmp1 >= tmp2 ? tmp1 : tmp2
            mentsu += tmp[0], tatsu += tmp[1], alone += tmp[2]
            return true
        }
        const calc = ()=>{
            let tmp_res = -1
            while (mentsu < 4 - furo) {
                if (tatsu && alone) {
                    tatsu--, alone--, mentsu++, tmp_res++
                    continue
                }
                if (tatsu && !alone) {
                    tatsu--, alone++, mentsu++, tmp_res++
                    continue
                }
                if (!tatsu && alone) {
                    alone -= 2, mentsu++, tmp_res += 2
                }
            }
            if (alone > 0) tmp_res++
            res = tmp_res < res ? tmp_res : res
            mentsu = tatsu = alone = 0
        }
        hai_arr = [[...hai_arr[0]], [...hai_arr[1]], [...hai_arr[2]], [...hai_arr[3]]]
        let arr = [...hai_arr[0], ...hai_arr[1], ...hai_arr[2], ...hai_arr[3]]
        let s = sum(arr)
        if (s > 14 || s % 3 === 0)
            return -2
        furo = Math.round((14 - s) / 3)
        let tuika = [0,0,0,0,0,0,0]
        if (s % 3 === 1) {
            //for (let i = 32;;i--) {
                //if (!arr[i]) {
                    //arr[i]++
                    //hai_arr[Math.floor(i / 9)][i % 9]++
                    //break
                //}
            //}
            tuika[6]++
        }
        for (let i = 0; i < 34; i++) {
            if (arr[i] === 0)
                continue
            let t = []
            t[0] = [...hai_arr[0]], t[1] = [...hai_arr[1]], t[2] = [...hai_arr[2]], t[3] = [...hai_arr[3]]
            t[Math.floor(i / 9)][i % 9] -= arr[i] >= 2 ? 2 : arr[i]
            search(t[0]) && search(t[1]) && search(t[2]) && search(t[3], true) && search(tuika, true) && calc()
            for (let count = 0; count < 3; count++) {
                t[count].push(t[count].shift())
            }
            search(t[0]) && search(t[1]) && search(t[2]) && search(t[3], true) && search(tuika, true) && calc()
            for (let count = 0; count < 3; count++) {
                t[count].push(t[count].shift())
            }
            search(t[0]) && search(t[1]) && search(t[2]) && search(t[3], true) && search(tuika, true) && calc()
        }
        return res
    }
    const syanten7 = (hai_arr)=>{
        let cnt = sum(hai_arr[0]) + sum(hai_arr[1]) + sum(hai_arr[2]) + sum(hai_arr[3])
        if (cnt < 13 || cnt > 14)
            return -2
        let arr = [...hai_arr[0], ...hai_arr[1], ...hai_arr[2], ...hai_arr[3]]
        let s = 0, t = 0
        for (let i = 0; i < 34; i++) {
            if (arr[i] >= 2) s++
            if (arr[i] === 1) t++
        }
        if (s + t >= 7)
            return 6 - s
        else
            return 6 - s + (7 - s - t)
    }
    const syanten13 = (hai_arr)=>{
        let cnt = sum(hai_arr[0]) + sum(hai_arr[1]) + sum(hai_arr[2]) + sum(hai_arr[3])
        if (cnt < 13 || cnt > 14)
            return -2
        let arr = [hai_arr[0][0], hai_arr[0][8], hai_arr[1][0], hai_arr[1][8], hai_arr[2][0], hai_arr[2][8], hai_arr[2][0], hai_arr[2][6]]
        let s = 0, t = 0
        for (let i = 0; i < 13; i++) {
            if (arr[i]) s++
            if (arr[i] > 1) t = 1
        }
        return 13 - s - t 
    }
    const syantenAll = (hai_arr)=>{
        let s7 = syanten7(hai_arr)
        let s13 = syanten13(hai_arr)
        if (s7 === -2 || s13 === -2)
            return syanten(hai_arr)
        else
            return Math.min(syanten(hai_arr), s7, s13)
    }

    const MPSZ = ['m', 'p', 's', 'z']
    const checkChi = (hai_arr, isUniverse = true)=>{
        let res = {count: 0}
        let map = {}
        for (let i = 0; i < 4; i++) {
            if(!isUniverse && (i==3))
                continue
            for (let ii = 0; ii < 9; ii++) {
                let list = []
                let stat = false;
                let iim1 = ii - 1
                let iim2 = ii - 2
                if(ii == 0){
                    iim1 = hai_arr[i].length-1
                    iim2 = hai_arr[i].length-2
                }else if(ii == 1){
                    iim2 = hai_arr[i].length-1
                }
                if(hai_arr[i][iim2] > 0 && hai_arr[i][iim1] > 0){
                    list.push((iim2+1)+""+(iim1+1)+MPSZ[i])
                    stat = true;
                }
                if(hai_arr[i][iim1] > 0 && hai_arr[i][(ii+1)%hai_arr[i].length] > 0){
                    list.push((iim1+1)+""+(((ii+1)%hai_arr[i].length)+1)+MPSZ[i])
                    stat = true;
                }
                if(hai_arr[i][(ii+1)%hai_arr[i].length] > 0 && hai_arr[i][(ii+2)%hai_arr[i].length] > 0){
                    list.push((((ii+1)%hai_arr[i].length)+1)+""+(((ii+2)%hai_arr[i].length)+1)+MPSZ[i])
                    stat = true;
                }
                if(stat)
                {
                    res.count++
                    map[ii+1+MPSZ[i]] = list
                }
            }
        }
        res.wait = map
        return res;
    }
    const checkPon = (hai_arr)=>{
        let res = {count: 0}
        let map = {}
        for (let i = 0; i < 4; i++) {
            for (let ii = 0; ii < 9; ii++) {
                if(hai_arr[i][ii]>1){
                    map[ii+1+MPSZ[i]] = {minkan : (hai_arr[i][ii]>2), ankan : (hai_arr[i][ii]>3)}
                    res.count++
                }
            }
        }
        res.wait = map
        return res;
    }
    const checkKan = (hai_arr)=>{
        let res = {count: 0}
        let map = {}
        for (let i = 0; i < 4; i++) {
            for (let ii = 0; ii < 9; ii++) {
                if(hai_arr[i][ii]>3){
                    map[ii+1+MPSZ[i]] = {minkan : false, ankan : true}
                    res.count++
                }
            }
        }
        res.wait = map
        return res;
    }
    const checkEWSN = (hai_arr)=>{
        let res = {count: 0}
        let map = {}
        if(hai_arr[3][1] > 0 && hai_arr[3][2] > 0 && hai_arr[3][3] > 0){
            map['1z'] = ['2z', '3z', '4z']
            res.count++
        }
        if(hai_arr[3][0] > 0 && hai_arr[3][2] > 0 && hai_arr[3][3] > 0){
            map['2z'] = ['1z', '3z', '4z']
            res.count++
        }
        if(hai_arr[3][0] > 0 && hai_arr[3][1] > 0 && hai_arr[3][3] > 0){
            map['3z'] = ['1z', '2z', '4z']
            res.count++
        }
        if(hai_arr[3][0] > 0 && hai_arr[3][1] > 0 && hai_arr[3][2] > 0){
            map['4z'] = ['1z', '2z', '3z']
            res.count++
        }
        res.wait = map
        return res;
    }
    const hairi = (hai_arr, is7or13 = false)=>{
        let syantenCalc = !is7or13 ? syanten : (haiArr)=>{
            return Math.min(syanten7(haiArr), syanten13(haiArr))
        }
        let sht = syantenCalc(hai_arr)
        let res = {now: sht}
        if (sht < 0)
            return res
        let self = []
        const calcHairi = ()=>{
            let map = {}
            for (let i = 0; i < 4; i++) {
                for (let ii = 0; ii < 9; ii++) {
                    let iim1 = ii - 1;
                    let iim2 = ii - 2;
                    if(iim1 < 0){
                        iim1 = hai_arr[i].length + iim1
                    }
                    if(iim2 < 0){
                        iim2 = hai_arr[i].length + iim2
                    }
                    if (hai_arr[i][ii] === undefined)
                        continue
                    if (i === self[0] && ii === self[1])
                        continue
                    if (!is7or13 && (hai_arr[i][ii] === 0 && !hai_arr[i][iim1] === 0 && !hai_arr[i][iim2] === 0 && !hai_arr[i][(ii+1)%hai_arr[i].length] === 0 && !hai_arr[i][(ii+1)%hai_arr[i].length] === 0))
                        continue
                    hai_arr[i][ii]++
                    if (syantenCalc(hai_arr) < sht) {
                        map[ii+1+MPSZ[i]] = 5 - hai_arr[i][ii]
                    }
                    hai_arr[i][ii]--
                }
            }
            return map
        }
        if ((sum(hai_arr[0]) + sum(hai_arr[1]) + sum(hai_arr[2]) + sum(hai_arr[3])) % 3 === 1) {
            res.wait = calcHairi()
            return res
        }
        for (let i = 0; i < 4; i++) {
            for (let ii = 0; ii < 9; ii++) {
                if (hai_arr[i][ii] === 0 || hai_arr[i][ii] === undefined)
                    continue
                hai_arr[i][ii]--
                if (syantenCalc(hai_arr) === sht) {
                    self = [i, ii]
                    res[ii+1+MPSZ[i]] = calcHairi()
                }
                hai_arr[i][ii]++
            }
        }
        return res
    }

    const exports = syantenAll
    exports.syanten = syanten
    exports.syanten7 = syanten7
    exports.syanten13 = syanten13
    exports.syantenAll = syantenAll
    exports.hairi = hairi
    exports.checkChi = checkChi
    exports.checkPon = checkPon
    exports.checkKan = checkKan
    exports.checkEWSN = checkEWSN

    if (typeof module === 'object' && module && module.exports) {
        module.exports = exports
    } 
    else if (typeof define === 'function' && define.amd) {
        define(()=>{
            return exports
        })
    }
    else if (typeof self === 'object' && self) {
        self.syanten = exports
    }

})()
