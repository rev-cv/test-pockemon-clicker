import { FC } from 'react';

type CarProps = {
	myFunc: (value: boolean) => JSX.Element;
}

const Car: FC<CarProps> = () => {
	return <>car</>
}

export default Car;