import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { CardTitle } from "../ui/card";
import { MoreHorizontal } from "lucide-react";

function LogsSection({ title }: { title: string }) {
    const logs = ['[10:12:06] Forwarder system initialized'];

    return (
        <Card className='border-border bg-[#252139]'>
            <CardHeader className='px-6 py-4 border-b border-border flex justify-between items-center'>
                <CardTitle className='text-foreground'>{title}</CardTitle>
                <Button variant='outlined' size='small' className='h-6 w-6'>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </CardHeader>
            <CardContent className='p-0'>
                <div className='h-48 overflow-y-auto bg-black text-green-400 p-4 font-mono text-sm'>
                    {logs.map((log, index) => (
                        <div key={index} className='mb-1'>
                            {log}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
export default LogsSection