import { Zone } from "../types/zone";

export const getParents = (zone: Zone, zones: Zone[], parentZoneList: string[] = []): string => {
    const parentZone = zones.find(z => z._id === zone.properties.parentZone)
    if(parentZone){
        parentZoneList.push(parentZone?.properties.displayName)
        return getParents(parentZone, zones, parentZoneList)
    } else {
        return parentZoneList.join(', ')
    }
} 