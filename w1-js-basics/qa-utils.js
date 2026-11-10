console.log('qa-utils 로드됨');
export const isAdmin = (role) => role ==='admin';
export const formatResult = (tcId, passed) => {return passed? `${tcId}: PASS` : `${tcId}: FAIL`};

export function passRate(passed, total){
    if(total === 0){
        return '0.0%'; // NaN 으로 나오는 값을 아예 치환해줬어요.
    }
    else if(passed < 0 || total <0){
        throw new Error('개수는 음수일 수 없습니다.');
    }
    else if(passed > total){
        throw new Error('전체 TC 개수 보다 통과한 TC 수가 많을 수 없습니다.');
    }
    return (passed/total * 100).toFixed(1)+'%';
}