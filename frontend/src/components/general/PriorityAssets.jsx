import PiorirtHighest from '../../assets/priority-assets/highest.svg';
import PriorityHigh from '../../assets/priority-assets/high.svg';
import PriorityMedium from '../../assets/priority-assets/medium.svg';
import PriorityLow from '../../assets/priority-assets/low.svg';
import PriorityLowest from '../../assets/priority-assets/lowest.svg';

const GetPriorityAssests = (priorityChoice) => {
    switch (priorityChoice) {
        case 1:
            return PiorirtHighest;
        case 2:
            return PriorityHigh;
        case 3:
            return PriorityMedium;
        case 4:
            return PriorityLow;
        case 5:
            return PriorityLowest;
        default:
            return null;
    }
}

export default GetPriorityAssests;