import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import { getUserbyClearkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"


const getEntries = async () =>{
    const user = await getUserbyClearkId()
    const enteries = await prisma.journalEntry.findMany({
        where:{
            userId: user.id
        },
        orderBy:{
            createAt: 'desc'
        }
    })
    return enteries
}

const JornalPage = async()=>{
    const enteries = await getEntries() 
    return (
        <div className="p-10">
            <h2 className="text-3xl mb-8">Journal</h2>
        <div className="grid grid-cols-3 gap-4">
            <NewEntryCard/>
            {enteries.map(entry => (
                <Link href={`/journal/${entry.id}`} key={entry.id}>
                <EntryCard entry={entry} />
                </Link>
            ))}
                
                
        </div>
        </div>
    )
}
export default JornalPage