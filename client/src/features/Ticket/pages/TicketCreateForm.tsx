import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetUserList } from "@/features/Profile/service/profileQueries";
import { useGetProjectList } from "@/features/Project/service/projectQueries";
import { Ticket, TicketSchema } from "@/features/Ticket/types/Ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function TicketCreateForm() {
    const form = useForm<Ticket>({
        resolver: zodResolver(TicketSchema),
    });

    const { data: users } = useGetUserList();
    const { data: projects } = useGetProjectList();

    function onSubmit(data: Ticket) {
        console.log(data);

        // TODO: To send post request to the API.
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((data) => onSubmit(data))}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="not-started">
                                            Not started
                                        </SelectItem>
                                        <SelectItem value="in-progress">
                                            In progress
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="assignee"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Asignee</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select asignees" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {users &&
                                            Object.values(users).map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={user.id || ""}
                                                >
                                                    {user.fname} {user.lname}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="updatedBy"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Updated By</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select user" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        {users &&
                                            Object.values(users).map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={user.id || ""}
                                                >
                                                    {user.fname} {user.lname}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="project"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project</FormLabel>

                                <Select
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select project" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {projects &&
                                            Object.values(projects).map(
                                                (project) => (
                                                    <SelectItem
                                                        key={project.id}
                                                        value={project.id || ""}
                                                    >
                                                        {project.name}
                                                    </SelectItem>
                                                )
                                            )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>

                                <Select
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(
                                            TicketSchema.shape.priority.options
                                        ).map((priority) => (
                                            <SelectItem
                                                key={priority}
                                                value={priority}
                                            >
                                                {priority}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
}