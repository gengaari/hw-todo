export default function Icon({type}){
    const icons = {
        add: 'Add',
    };

    return <span style={{ fontSize: '18px' }}>{icons[type]}</span>;
    
}