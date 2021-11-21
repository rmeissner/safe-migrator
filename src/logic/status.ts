import { serviceSdk, bscFixSingleton } from "./constants"
import { SafeStatus } from "./types";

export const loadSafeStatus = async (safeAddress: string): Promise<SafeStatus> => {
    const safeInfo = await serviceSdk.getSafeInfo(safeAddress)
    return {
        fixEnabled: safeInfo.masterCopy.toLowerCase() === bscFixSingleton.toLowerCase()
    }
}